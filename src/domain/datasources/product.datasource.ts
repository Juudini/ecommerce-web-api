import { ProductDto, GeneralIdDto, ProductPartialDto, ProductEntity, PaginationDto } from "../index";

export abstract class ProductDatasource {
    abstract create(productDto: ProductDto): Promise<ProductEntity>;

    abstract getAll(paginationDto: PaginationDto): Promise<ProductEntity[]>;

    abstract getById(productIdDto: GeneralIdDto): Promise<ProductEntity>;

    abstract deleteById(productIdDto: GeneralIdDto): Promise<ProductEntity>;

    abstract updateById(productIdDto: GeneralIdDto, productDto: ProductDto): Promise<ProductEntity>;

    abstract partialUpdateById(
        productIdDto: GeneralIdDto,
        productPartialDto: ProductPartialDto
    ): Promise<ProductEntity>;
}
