import { PaginationDto, ProductEntity, GeneralIdDto, ProductDto, ProductPartialDto } from "../index";

export abstract class ProductRepository {
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
