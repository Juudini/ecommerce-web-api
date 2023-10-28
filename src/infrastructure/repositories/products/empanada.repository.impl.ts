import {
    EmpanadaDatasource,
    EmpanadaDto,
    ProductIdDto,
    EmpanadaEntity,
    EmpanadaRepository,
    EmpanadaPartialDto,
    PaginationDto
} from "../../../domain";

export class EmpanadaRepositoryImpl implements EmpanadaRepository {
    constructor(private readonly empanadaDatasource: EmpanadaDatasource) {}

    create = (empanadaDto: EmpanadaDto): Promise<EmpanadaEntity> => {
        return this.empanadaDatasource.create(empanadaDto);
    };
    getAll = (paginationDto: PaginationDto): Promise<EmpanadaEntity[]> => {
        return this.empanadaDatasource.getAll(paginationDto);
    };
    getById = (productIdDto: ProductIdDto): Promise<EmpanadaEntity> => {
        return this.empanadaDatasource.getById(productIdDto);
    };
    deleteById(productIdDto: ProductIdDto): Promise<EmpanadaEntity> {
        return this.empanadaDatasource.deleteById(productIdDto);
    }
    updateById(productIdDto: ProductIdDto, empanadaDto: EmpanadaDto): Promise<EmpanadaEntity> {
        return this.empanadaDatasource.updateById(productIdDto, empanadaDto);
    }
    partialUpdateById(productIdDto: ProductIdDto, empanadaPartialDto: EmpanadaPartialDto): Promise<EmpanadaEntity> {
        return this.empanadaDatasource.partialUpdateById(productIdDto, empanadaPartialDto);
    }
}
