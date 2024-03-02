import { ProductDto, GeneralIdDto, ProductPartialDto, PaginationDto, ProductRepository } from "../index";

interface IProductUseCase {
    create(productDto: ProductDto): Promise<ProductDto>;
    getAll(paginationDto: PaginationDto): Promise<ProductDto[]>;
    getById(productIdDto: GeneralIdDto): Promise<ProductDto>;
    deleteById(productIdDto: GeneralIdDto): Promise<ProductDto>;
    updateById(productIdDto: GeneralIdDto, productDto: ProductDto): Promise<ProductDto>;
    partialUpdateById(productIdDto: GeneralIdDto, productPartialDto: ProductPartialDto): Promise<ProductDto>;
}

export class ProductUseCase implements IProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    create = async (productDto: ProductDto): Promise<ProductDto> => {
        return await this.productRepository.create(productDto);
    };
    getAll = async (paginationDto: PaginationDto): Promise<ProductDto[]> => {
        return await this.productRepository.getAll(paginationDto);
    };

    getById = async (productIdDto: GeneralIdDto): Promise<ProductDto> => {
        return await this.productRepository.getById(productIdDto);
    };

    deleteById = async (productIdDto: GeneralIdDto): Promise<ProductDto> => {
        return await this.productRepository.deleteById(productIdDto);
    };

    updateById = async (productIdDto: GeneralIdDto, productDto: ProductDto): Promise<ProductDto> => {
        return await this.productRepository.updateById(productIdDto, productDto);
    };

    partialUpdateById = async (
        productIdDto: GeneralIdDto,
        productPartialDto: ProductPartialDto
    ): Promise<ProductDto> => {
        return await this.productRepository.partialUpdateById(productIdDto, productPartialDto);
    };
}
