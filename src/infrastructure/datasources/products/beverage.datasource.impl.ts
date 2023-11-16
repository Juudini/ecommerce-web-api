import { logger } from "../../../config";
import { beverageModel } from "../../../data";
import {
    BeverageDatasource,
    CustomError,
    BeverageDto,
    ProductIdDto,
    BeverageEntity,
    BeveragePartialDto,
    executePagination,
    PaginationDto,
    validateSort
} from "../../../domain";
import { BeverageMapper } from "../../mappers";

export class BeverageDatasourceImpl implements BeverageDatasource {
    create = async (beverageDto: BeverageDto): Promise<BeverageEntity> => {
        const { name, description, price, category, thumbnail, status } = beverageDto;
        try {
            const exists = await beverageModel.findOne({
                name,
                description,
                price
            });

            if (exists) throw CustomError.badRequest("Beverage with the same properties already exists.");

            const beverage = await beverageModel.create({
                name,
                description,
                price,
                category,
                thumbnail,
                status
            });

            await beverage.save();

            return BeverageMapper.BeverageEntityFromObject(beverage);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for the beverage. Details:", err);
            throw CustomError.internalServer();
        }
    };

    getAll = async (paginationDto: PaginationDto): Promise<BeverageEntity[]> => {
        const { page, limit, sort } = paginationDto;
        try {
            const sortOptionsResults = validateSort(sort);

            const products = await beverageModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sortOptionsResults);

            const docs: number = await beverageModel.countDocuments();

            const paginationResults = executePagination({
                page,
                limit,
                sort,
                productUrl: "beverages",
                docs,
                products
            });

            return paginationResults as unknown as BeverageEntity[];
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for all beverages. Details:", err);
            throw CustomError.internalServer();
        }
    };

    getById = async (productIdDto: ProductIdDto): Promise<BeverageEntity> => {
        const { id } = productIdDto;
        try {
            const existsBeverage = await beverageModel.findById(id);

            if (!existsBeverage) {
                throw CustomError.notFound(`Beverage with ID: ${id} not found`);
            }

            return BeverageMapper.BeverageEntityFromObject(existsBeverage);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for the beverage by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    deleteById = async (productIdDto: ProductIdDto): Promise<BeverageEntity> => {
        const { id } = productIdDto;
        try {
            const deleted = await beverageModel.findByIdAndDelete(id);
            if (!deleted) {
                throw CustomError.notFound(`Beverage with ID: ${id} not found`);
            }
            return BeverageMapper.BeverageEntityFromObject(deleted);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while deleting beverage by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    updateById = async (productIdDto: ProductIdDto, beverageDto: BeverageDto): Promise<BeverageEntity> => {
        const { id } = productIdDto;
        try {
            const existsBeverage = await beverageModel.findOneAndUpdate({ _id: id }, beverageDto, { new: true });
            if (!existsBeverage) {
                throw CustomError.notFound(`Beverage with ID: ${id} not found`);
            }

            return BeverageMapper.BeverageEntityFromObject(existsBeverage);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while updating beverage by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    partialUpdateById = async (
        productIdDto: ProductIdDto,
        beveragePartialDto: BeveragePartialDto
    ): Promise<BeverageEntity> => {
        const { id } = productIdDto;
        try {
            const existsBeverage = await beverageModel.findOneAndUpdate({ _id: id }, beveragePartialDto, { new: true });
            if (!existsBeverage) {
                throw CustomError.notFound(`Beverage with ID: ${id} not found`);
            }

            return BeverageMapper.BeverageEntityFromObject(existsBeverage);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while partial updating beverage by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };
}
