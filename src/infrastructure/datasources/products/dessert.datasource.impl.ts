import { logger } from "../../../config";
import { dessertModel } from "../../../data";
import {
    DessertDatasource,
    CustomError,
    DessertDto,
    ProductIdDto,
    DessertEntity,
    DessertPartialDto,
    PaginationDto,
    executePagination,
    validateSort
} from "../../../domain";
import { DessertMapper } from "../../mappers";

export class DessertDatasourceImpl implements DessertDatasource {
    create = async (dessertDto: DessertDto): Promise<DessertEntity> => {
        const { name, description, price, type, thumbnail, status } = dessertDto;
        try {
            const exists = await dessertModel.findOne({
                name,
                description,
                price
            });

            if (exists) throw CustomError.badRequest("Dessert with the same properties already exists.");

            const dessert = await dessertModel.create({
                name,
                description,
                price,
                type,
                thumbnail,
                status
            });

            await dessert.save();

            return DessertMapper.DessertEntityFromObject(dessert);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            logger.error("Error while searching for the dessert. Details:", error);
            throw CustomError.internalServer();
        }
    };

    getAll = async (paginationDto: PaginationDto): Promise<DessertEntity[]> => {
        const { page, limit, sort } = paginationDto;
        try {
            const sortOptionsResults = validateSort(sort);

            const products = await dessertModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sortOptionsResults);

            const docs: number = await dessertModel.countDocuments();

            const paginationResults = executePagination({
                page,
                limit,
                sort,
                productUrl: "desserts",
                docs,
                products
            });

            return paginationResults as unknown as DessertEntity[];
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            logger.error("Error while searching for all desserts. Details:", error);
            throw CustomError.internalServer();
        }
    };

    getById = async (productIdDto: ProductIdDto): Promise<DessertEntity> => {
        const { id } = productIdDto;
        try {
            const existsDessert = await dessertModel.findById(id);

            if (!existsDessert) {
                throw CustomError.notFound(`Dessert with ID: ${id} not found`);
            }

            return DessertMapper.DessertEntityFromObject(existsDessert);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            logger.error("Error while searching for the dessert by ID. Details:", error);
            throw CustomError.internalServer();
        }
    };

    deleteById = async (productIdDto: ProductIdDto): Promise<DessertEntity> => {
        const { id } = productIdDto;
        try {
            const deleted = await dessertModel.findByIdAndDelete(id);
            if (!deleted) {
                throw CustomError.notFound(`Dessert with ID: ${id} not found`);
            }
            return DessertMapper.DessertEntityFromObject(deleted);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            logger.error("Error while deleting dessert by ID. Details:", error);
            throw CustomError.internalServer();
        }
    };

    updateById = async (productIdDto: ProductIdDto, dessertDto: DessertDto): Promise<DessertEntity> => {
        const { id } = productIdDto;
        try {
            const existsDessert = await dessertModel.findOneAndUpdate({ _id: id }, dessertDto, { new: true });
            if (!existsDessert) {
                throw CustomError.notFound(`Dessert with ID: ${id} not found`);
            }

            return DessertMapper.DessertEntityFromObject(existsDessert);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            logger.error("Error while updating dessert by ID. Details:", error);
            throw CustomError.internalServer();
        }
    };

    partialUpdateById = async (
        productIdDto: ProductIdDto,
        dessertPartialDto: DessertPartialDto
    ): Promise<DessertEntity> => {
        const { id } = productIdDto;
        try {
            const existsDessert = await dessertModel.findOneAndUpdate({ _id: id }, dessertPartialDto, { new: true });
            if (!existsDessert) {
                throw CustomError.notFound(`Dessert with ID: ${id} not found`);
            }

            return DessertMapper.DessertEntityFromObject(existsDessert);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            logger.error("Error while partial updating dessert by ID. Details:", error);
            throw CustomError.internalServer();
        }
    };
}
