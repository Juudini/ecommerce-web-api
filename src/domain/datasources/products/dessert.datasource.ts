import { DessertDto, ProductIdDto, DessertPartialDto, DessertEntity, PaginationDto } from "../../";

export abstract class DessertDatasource {
    abstract create(dessertDto: DessertDto): Promise<DessertEntity>;

    abstract getAll(paginationDto: PaginationDto): Promise<DessertEntity[]>;

    abstract getById(productIdDto: ProductIdDto): Promise<DessertEntity>;

    abstract deleteById(productIdDto: ProductIdDto): Promise<DessertEntity>;

    abstract updateById(productIdDto: ProductIdDto, dessertDto: DessertDto): Promise<DessertEntity>;

    abstract partialUpdateById(
        productIdDto: ProductIdDto,
        dessertPartialDto: DessertPartialDto
    ): Promise<DessertEntity>;
}
