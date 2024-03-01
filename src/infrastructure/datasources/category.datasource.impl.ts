import { logger } from "../../config";
//! CAMBIAR MONGO POR PRISMA
import {
    CategoryDatasource,
    CustomError,
    CategoryDto,
    GeneralIdDto,
    CategoryEntity,
    CategoryPartialDto,
    PaginationDto,
    validateSort,
    executePagination
} from "../../domain";
import { CategoryMapper } from "../mappers";
const categoryModel: any = ["s"];
export class CategoryDatasourceImpl implements CategoryDatasource {
    create = async (productDto: CategoryDto): Promise<CategoryEntity> => {
        const { title, products } = productDto;
        try {
            const exists = await categoryModel.findOne({
                title,
                products
            });

            if (exists) throw CustomError.badRequest("Category with the same properties already exists.");

            const product = await categoryModel.create({
                title
            });

            await product.save();

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
            const sortOptionsResults = validateSort(sort);

            const products = await categoryModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sortOptionsResults);

            const docs: number = await categoryModel.countDocuments();

            const paginationResults = executePagination({
                page,
                limit,
                sort,
                productUrl: "products",
                docs,
                products
            });

            return paginationResults as unknown as CategoryEntity[];
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for all products. Details:", err);
            throw CustomError.internalServer();
        }
    };

    getById = async (productIdDto: GeneralIdDto): Promise<CategoryEntity> => {
        const { id } = productIdDto;
        try {
            const existsCategory = await categoryModel.findById(id);

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

    deleteById = async (productIdDto: GeneralIdDto): Promise<CategoryEntity> => {
        const { id } = productIdDto;
        try {
            const deleted = await categoryModel.findByIdAndDelete(id);
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

    updateById = async (productIdDto: GeneralIdDto, productDto: CategoryDto): Promise<CategoryEntity> => {
        const { id } = productIdDto;
        try {
            const existsCategory = await categoryModel.findOneAndUpdate({ _id: id }, productDto, { new: true });
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
        productIdDto: GeneralIdDto,
        productPartialDto: CategoryPartialDto
    ): Promise<CategoryEntity> => {
        const { id } = productIdDto;
        try {
            const existsCategory = await categoryModel.findOneAndUpdate({ _id: id }, productPartialDto, { new: true });
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
