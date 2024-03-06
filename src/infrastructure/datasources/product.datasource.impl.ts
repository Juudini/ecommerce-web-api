import { CategoryProps, ProductImageProps } from "@/domain/types";
import { logger } from "../../config";
import {
    ProductDatasource,
    CustomError,
    ProductDto,
    GeneralIdDto,
    ProductEntity,
    ProductPartialDto
} from "../../domain";
import { PaginationDto, executePagination } from "../../shared";
import { ProductMapper } from "../mappers";
import prisma from "../../libs/prisma";
import { uploadImages } from "../../libs/cloudinary";

export interface ProductProps {
    title: string;
    description: string;
    price: string;
    inStock: number;
    id?: string;
    product_images?: ProductImageProps[];
    categories?: CategoryProps[];
}

interface PaginationResultsProps {
    status: string;
    payload: ProductProps[];
    page: number;
    docs: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
    prevLink: string | null;
    nextLink: string | null;
}

export class ProductDatasourceImpl implements ProductDatasource {
    create = async (productDto: ProductDto): Promise<ProductEntity> => {
        const { title, description, price, inStock, product_images, categories } = productDto;
        try {
            const existingProduct = await prisma.product.findFirst({
                where: { title, description }
            });

            if (existingProduct) throw CustomError.badRequest("Product with the same properties already exists.");

            const dbProduct = await prisma.product.create({
                data: {
                    title,
                    description,
                    price,
                    inStock,
                    categories: {
                        connectOrCreate: categories!.map((categoryName): any => ({
                            where: { title: categoryName },
                            create: { title: categoryName }
                        }))
                    }
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    price: true,
                    inStock: true,
                    product_images: true,
                    categories: true
                }
            });
            //Todo, add logic:
            //?(-) To add image before created product
            //* Give the product id and create product_images with these id
            if (product_images!.length > 0) {
                const uploadedImages = await uploadImages(product_images as any);
                await prisma.product_image.createMany({
                    data: uploadedImages.map(image => ({
                        url: image,
                        productId: dbProduct.id
                    }))
                });
            }
            return ProductMapper.ProductEntityFromObject(dbProduct);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for the product. Details:", err);
            throw CustomError.internalServer();
        }
    };

    getAll = async (paginationDto: PaginationDto): Promise<ProductEntity[]> => {
        const { page, limit, sort } = paginationDto;
        try {
            const docs: number = await prisma.product.count();

            const skipValue = (page - 1) * limit;

            const categories = await prisma.product.findMany({
                take: limit,
                skip: skipValue,
                orderBy: { price: sort },
                include: { product_images: true, categories: true }
            });

            const paginationResults: PaginationResultsProps = executePagination({
                page,
                limit,
                sort,
                endpointName: "products",
                docs,
                products: categories
            });

            return paginationResults as unknown as ProductEntity[];
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for all products. Details:", err);
            throw CustomError.internalServer();
        }
    };

    getById = async (productIdDto: GeneralIdDto): Promise<ProductEntity> => {
        const { id } = productIdDto;
        try {
            const existsProduct = await prisma.product.findUnique({ where: { id } });

            if (!existsProduct) {
                throw CustomError.notFound(`Product with ID: ${id} not found`);
            }

            return ProductMapper.ProductEntityFromObject(existsProduct);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for the product by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    deleteById = async (productIdDto: GeneralIdDto): Promise<ProductEntity> => {
        const { id } = productIdDto;
        try {
            const deleted = await prisma.product.delete({ where: { id } });

            if (!deleted) {
                throw CustomError.notFound(`Product with ID: ${id} not found`);
            }

            return ProductMapper.ProductEntityFromObject(deleted);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while deleting product by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    updateById = async (productIdDto: GeneralIdDto, productDto: ProductDto): Promise<ProductEntity> => {
        const { id } = productIdDto;
        const { title, description, inStock, price, categories } = productDto;

        try {
            const existsProduct = await prisma.product.update({
                where: { id },
                data: {
                    title,
                    description,
                    inStock,
                    price,
                    categories: {
                        updateMany: categories!.map((categoryName: any) => categoryName.title)
                    }
                },
                select: {
                    id: true,
                    categories: true,
                    description: true,
                    inStock: true,
                    price: true,
                    product_images: true,
                    title: true
                }
            });

            if (!existsProduct) {
                throw CustomError.notFound(`Product with ID: ${id} not found`);
            }

            return ProductMapper.ProductEntityFromObject(existsProduct);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while updating product by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    partialUpdateById = async (
        productIdDto: GeneralIdDto,
        productPartialDto: ProductPartialDto
    ): Promise<ProductEntity> => {
        const { id } = productIdDto;
        try {
            const existsProduct = await prisma.product.update({
                where: { id },
                data: productPartialDto as any, //Todo: fix type later
                select: {
                    id: true,
                    categories: true,
                    description: true,
                    inStock: true,
                    price: true,
                    product_images: true,
                    title: true
                }
            });
            if (!existsProduct) {
                throw CustomError.notFound(`Product with ID: ${id} not found`);
            }

            return ProductMapper.ProductEntityFromObject(existsProduct);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while partial updating product by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };
}
