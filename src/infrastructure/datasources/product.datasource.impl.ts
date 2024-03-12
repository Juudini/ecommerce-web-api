/* eslint-disable unicorn/prefer-at */
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
import { ImageProps, deleteImages, uploadImages } from "../../libs/cloudinary";

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
                        connectOrCreate: categories!.map(categoryName => ({
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

            if (product_images) {
                const uploadedImages = await uploadImages(product_images as ImageProps[]);
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
            const existsProduct = await prisma.product.findUnique({
                where: { id },
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
            const deletedProduct = await prisma.product.delete({
                where: { id },
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

            if (!deletedProduct) {
                throw CustomError.notFound(`Product with ID: ${id} not found`);
            }

            const publicIds = deletedProduct.product_images.map(image => {
                const urlParts = image.url.split("/");
                const publicId = urlParts[urlParts.length - 1].split(".")[0];
                return publicId;
            });
            await deleteImages(publicIds);

            return ProductMapper.ProductEntityFromObject(deletedProduct);
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
        const { title, description, inStock, price, categories, product_images } = productDto;

        try {
            const existsProduct = await prisma.product.findUnique({
                where: { id },
                include: { product_images: true }
            });

            if (!existsProduct) {
                throw CustomError.notFound(`Product with ID: ${id} not found`);
            }

            const updatedProduct = await prisma.product.update({
                where: { id },
                data: {
                    title,
                    description,
                    inStock,
                    price,
                    categories: {
                        set: categories?.map(categoryName => ({ title: categoryName }))
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

            if (product_images && product_images.length > 0) {
                const publicIds = existsProduct.product_images.map(image => {
                    const urlParts = image.url.split("/");
                    return urlParts[urlParts.length - 1].split(".")[0];
                });
                await deleteImages(publicIds);

                const uploadedImages = await uploadImages(product_images as ImageProps[]);
                await prisma.product_image.createMany({
                    data: uploadedImages.map(image => ({
                        url: image,
                        productId: updatedProduct.id
                    }))
                });
            }

            return ProductMapper.ProductEntityFromObject(updatedProduct);
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
        const { title, description, inStock, price, categories, product_images } = productPartialDto;

        try {
            const existsProduct = await prisma.product.findUnique({
                where: { id },
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

            if (!existsProduct) {
                throw CustomError.notFound(`Product with ID: ${id} not found`);
            }

            const updatedProduct = await prisma.product.update({
                where: { id },
                data: {
                    title: title || existsProduct.title,
                    description: description || existsProduct.description,
                    inStock: inStock || existsProduct.inStock,
                    price: price || existsProduct.price,
                    categories: {
                        set:
                            categories?.map((categoryName: any) => ({ title: categoryName })) ||
                            existsProduct.categories
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

            if (product_images && product_images.length > 0) {
                const publicIds = existsProduct.product_images.map(image => {
                    const urlParts = image.url.split("/");
                    return urlParts[urlParts.length - 1].split(".")[0];
                });
                await deleteImages(publicIds);

                const uploadedImages = await uploadImages(product_images as ImageProps[]);
                await prisma.product_image.createMany({
                    data: uploadedImages.map(image => ({
                        url: image,
                        productId: updatedProduct.id
                    }))
                });
            }

            return ProductMapper.ProductEntityFromObject(updatedProduct);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while partial updating product by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };
}
