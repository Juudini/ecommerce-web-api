import { CategoryProps, ProductImageProps } from "@/domain/types";
import { logger } from "../../config";
import {
    ProductDatasource,
    CustomError,
    ProductDto,
    GeneralIdDto,
    ProductEntity,
    ProductPartialDto,
    PaginationDto
} from "../../domain";
import { executePagination } from "../../domain";
import { ProductMapper } from "../mappers";
import prisma from "../../libs/prisma";

export interface ProductProps {
    title: string;
    description: string;
    price: string;
    inStock: number;
    id?: string;
    product_image?: ProductImageProps[];
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
        const { title, description, price, inStock, product_image, categories } = productDto;
        try {
            const existingProduct = await prisma.product.findFirst({
                where: { title, description }
            });

            if (existingProduct) throw CustomError.badRequest("Product with the same properties already exists.");

            const product = await prisma.product.create({
                data: {
                    title,
                    description,
                    price: Number(price),
                    inStock,
                    product_image: {
                        createMany: {
                            data: product_image!.map(imageUrl => ({ url: imageUrl })) as any
                        }
                    },
                    categories: {
                        connectOrCreate: categories!.map(categoryName => ({
                            where: { title: categoryName },
                            create: { title: categoryName }
                        })) as any
                    }
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    price: true,
                    inStock: true,
                    product_image: true,
                    categories: true
                }
            });

            return ProductMapper.ProductEntityFromObject(product);
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
                orderBy: { title: sort },
                include: { product_image: true, categories: true }
            });

            const paginationResults: PaginationResultsProps = executePagination({
                page,
                limit,
                sort,
                productUrl: "categories",
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
        try {
            const existsProduct = await prisma.product.update({
                where: { id },
                data: productDto as any, //Todo fixear luego
                select: {
                    id: true,
                    categories: true,
                    description: true,
                    inStock: true,
                    price: true,
                    product_image: true,
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
                data: productPartialDto as any, //Todo fixear luego
                select: {
                    id: true,
                    categories: true,
                    description: true,
                    inStock: true,
                    price: true,
                    product_image: true,
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
