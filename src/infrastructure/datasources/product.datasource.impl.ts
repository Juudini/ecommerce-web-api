import { logger } from "../../config";
//! CAMBIAR MONGO POR PRISMA
import {
    ProductDatasource,
    CustomError,
    ProductDto,
    GeneralIdDto,
    ProductEntity,
    ProductPartialDto,
    PaginationDto,
    validateSort
} from "../../domain";
import { executePagination } from "../../domain";
import { ProductMapper } from "../mappers";
const productModel: any = [""];
export class ProductDatasourceImpl implements ProductDatasource {
    create = async (productDto: ProductDto): Promise<ProductEntity> => {
        const { title, description, price, inStock, product_image, categories } = productDto;
        try {
            const exists = await productModel.findOne({
                title,
                description,
                price
            });

            if (exists) throw CustomError.badRequest("Product with the same properties already exists.");

            const product = await productModel.create({
                title,
                description,
                price,
                inStock,
                product_image,
                categories
            });

            await product.save();

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
            const sortOptionsResults = validateSort(sort);

            const products = await productModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sortOptionsResults);

            const docs: number = await productModel.countDocuments();

            const paginationResults = executePagination({
                page,
                limit,
                sort,
                productUrl: "products",
                docs,
                products
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
            const existsProduct = await productModel.findById(id);

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
            const deleted = await productModel.findByIdAndDelete(id);
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
            const existsProduct = await productModel.findOneAndUpdate({ _id: id }, productDto, { new: true });
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
            const existsProduct = await productModel.findOneAndUpdate({ _id: id }, productPartialDto, { new: true });
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
