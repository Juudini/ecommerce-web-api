import { EmpanadaDto, ProductIdDto, EmpanadaPartialDto, EmpanadaEntity, PaginationDto } from "../../";

export abstract class EmpanadaDatasource {
    abstract create(empanadaDto: EmpanadaDto): Promise<EmpanadaEntity>;

    abstract getAll(paginationDto: PaginationDto): Promise<EmpanadaEntity[]>;

    abstract getById(productIdDto: ProductIdDto): Promise<EmpanadaEntity>;

    abstract deleteById(productIdDto: ProductIdDto): Promise<EmpanadaEntity>;

    abstract updateById(productIdDto: ProductIdDto, empanadaDto: EmpanadaDto): Promise<EmpanadaEntity>;

    abstract partialUpdateById(
        productIdDto: ProductIdDto,
        empanadaPartialDto: EmpanadaPartialDto
    ): Promise<EmpanadaEntity>;
}
