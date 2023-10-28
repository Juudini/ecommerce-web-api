import { BeverageDto, BeverageEntity, ProductIdDto, BeveragePartialDto, PaginationDto } from "../../";

export abstract class BeverageDatasource {
    abstract create(beverageDto: BeverageDto): Promise<BeverageEntity>;

    abstract getAll(paginationDto: PaginationDto): Promise<BeverageEntity[]>;

    abstract getById(productIdDto: ProductIdDto): Promise<BeverageEntity>;

    abstract deleteById(productIdDto: ProductIdDto): Promise<BeverageEntity>;

    abstract updateById(productIdDto: ProductIdDto, beverageDto: BeverageDto): Promise<BeverageEntity>;

    abstract partialUpdateById(
        productIdDto: ProductIdDto,
        beveragePartialDto: BeveragePartialDto
    ): Promise<BeverageEntity>;
}
