import { logger } from "../../config";
import prisma from "../../libs/prisma";

import {
    CategoryDatasource,
    CustomError,
    CategoryDto,
    GeneralIdDto,
    CategoryEntity,
    CategoryPartialDto
} from "../../domain";
import { PaginationDto, executePagination } from "../../shared";
import { CategoryMapper } from "../mappers";
import { ProductProps } from "@/domain/types";

export interface CategoryProps {
    id: string;
    title: string;
    product?: ProductProps[];
}

interface PaginationResultsProps {
    status: string;
    payload: CategoryProps[];
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

export class CategoryDatasourceImpl implements CategoryDatasource {
    create = async (categoryDto: CategoryDto): Promise<CategoryEntity> => {
        const { title } = categoryDto;
        try {
            const exists = await prisma.category.findUnique({
                where: { title }
            });

            if (exists) throw CustomError.badRequest("Category with the same properties already exists.");

            const product = await prisma.category.create({
                data: {
                    title
                },
                select: { id: true, title: true, products: true }
            });

            return CategoryMapper.CategoryEntityFromObject(product);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for the product. Details:", err);
            throw CustomError.internalServer();
        }
    };

    getAll = async (paginationDto: PaginationDto): Promise<CategoryEntity[]> => {
        const { page, limit, sort } = paginationDto;
        try {
            const docs: number = await prisma.category.count();

            const skipValue = (page - 1) * limit;

            const categories = await prisma.category.findMany({
                take: limit,
                skip: skipValue,
                orderBy: { title: sort }
            });

            const paginationResults: PaginationResultsProps = executePagination({
                page,
                limit,
                sort,
                endpointName: "categories",
                docs,
                products: categories
            });

            return paginationResults as unknown as CategoryEntity[];
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for all categories. Details:", err);
            throw CustomError.internalServer();
        }
    };

    getById = async (generalIdDto: GeneralIdDto): Promise<CategoryEntity> => {
        const { id } = generalIdDto;
        try {
            const existsCategory = await prisma.category.findUnique({
                where: { id },
                select: {
                    id: true,
                    products: true,
                    title: true
                }
            });

            if (!existsCategory) {
                throw CustomError.notFound(`Category with ID: ${id} not found`);
            }

            return CategoryMapper.CategoryEntityFromObject(existsCategory);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for the product by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    deleteById = async (generalIdDto: GeneralIdDto): Promise<CategoryEntity> => {
        const { id } = generalIdDto;
        try {
            const deleted = await prisma.category.delete({ where: { id } });
            if (!deleted) {
                throw CustomError.notFound(`Category with ID: ${id} not found`);
            }
            return CategoryMapper.CategoryEntityFromObject(deleted);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while deleting product by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    updateById = async (generalIdDto: GeneralIdDto, categoryDto: CategoryDto): Promise<CategoryEntity> => {
        const { id } = generalIdDto;
        try {
            const existsCategory = await prisma.category.update({
                where: { id },
                data: categoryDto as any, //Todo fixear luego
                select: { id: true, products: true, title: true }
            });
            categoryDto;

            if (!existsCategory) {
                throw CustomError.notFound(`Category with ID: ${id} not found`);
            }

            return CategoryMapper.CategoryEntityFromObject(existsCategory);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while updating product by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    partialUpdateById = async (
        generalIdDto: GeneralIdDto,
        categoryPartialDto: CategoryPartialDto
    ): Promise<CategoryEntity> => {
        const { id } = generalIdDto;
        try {
            const existsCategory = await prisma.category.update({
                where: { id },
                data: categoryPartialDto,
                select: { id: true, products: true, title: true }
            });
            if (!existsCategory) {
                throw CustomError.notFound(`Category with ID: ${id} not found`);
            }

            return CategoryMapper.CategoryEntityFromObject(existsCategory);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while partial updating product by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };
}
