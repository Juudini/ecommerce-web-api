import { logger } from "../../../config";
import { empanadaModel } from "../../../data";
import {
    EmpanadaDatasource,
    CustomError,
    EmpanadaDto,
    ProductIdDto,
    EmpanadaEntity,
    EmpanadaPartialDto,
    executePagination,
    PaginationDto,
    validateSort
} from "../../../domain";
import { EmpanadaMapper } from "../../mappers";

export class EmpanadaDatasourceImpl implements EmpanadaDatasource {
    create = async (empanadaDto: EmpanadaDto): Promise<EmpanadaEntity> => {
        const { name, description, price, thumbnail, status } = empanadaDto;
        try {
            const exists = await empanadaModel.findOne({
                name,
                description,
                price
            });

            if (exists) throw CustomError.badRequest("Empanada with the same properties already exists.");

            const empanada = await empanadaModel.create({
                name,
                description,
                price,
                thumbnail,
                status
            });

            await empanada.save();

            return EmpanadaMapper.EmpanadaEntityFromObject(empanada);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for the empanada. Details:", err);
            throw CustomError.internalServer();
        }
    };

    getAll = async (paginationDto: PaginationDto): Promise<EmpanadaEntity[]> => {
        const { page, limit, sort } = paginationDto;
        try {
            const sortOptionsResults = validateSort(sort);

            const products = await empanadaModel
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sortOptionsResults);

            const docs: number = await empanadaModel.countDocuments();

            const paginationResults = executePagination({
                page,
                limit,
                sort,
                productUrl: "empanadas",
                docs,
                products
            });

            return paginationResults as unknown as EmpanadaEntity[];
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for all empanadas. Details:", err);
            throw CustomError.internalServer();
        }
    };

    getById = async (productIdDto: ProductIdDto): Promise<EmpanadaEntity> => {
        const { id } = productIdDto;
        try {
            const existsEmpanada = await empanadaModel.findById(id);

            if (!existsEmpanada) {
                throw CustomError.notFound(`Empanada with ID: ${id} not found`);
            }

            return EmpanadaMapper.EmpanadaEntityFromObject(existsEmpanada);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while searching for the empanada by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    deleteById = async (productIdDto: ProductIdDto): Promise<EmpanadaEntity> => {
        const { id } = productIdDto;
        try {
            const deleted = await empanadaModel.findByIdAndDelete(id);
            if (!deleted) {
                throw CustomError.notFound(`Empanada with ID: ${id} not found`);
            }
            return EmpanadaMapper.EmpanadaEntityFromObject(deleted);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while deleting empanada by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    updateById = async (productIdDto: ProductIdDto, empanadaDto: EmpanadaDto): Promise<EmpanadaEntity> => {
        const { id } = productIdDto;
        try {
            const existsEmpanada = await empanadaModel.findOneAndUpdate({ _id: id }, empanadaDto, { new: true });
            if (!existsEmpanada) {
                throw CustomError.notFound(`Empanada with ID: ${id} not found`);
            }

            return EmpanadaMapper.EmpanadaEntityFromObject(existsEmpanada);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while updating empanada by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };

    partialUpdateById = async (
        productIdDto: ProductIdDto,
        empanadaPartialDto: EmpanadaPartialDto
    ): Promise<EmpanadaEntity> => {
        const { id } = productIdDto;
        try {
            const existsEmpanada = await empanadaModel.findOneAndUpdate({ _id: id }, empanadaPartialDto, { new: true });
            if (!existsEmpanada) {
                throw CustomError.notFound(`Empanada with ID: ${id} not found`);
            }

            return EmpanadaMapper.EmpanadaEntityFromObject(existsEmpanada);
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }
            logger.error("Error while partial updating empanada by ID. Details:", err);
            throw CustomError.internalServer();
        }
    };
}
