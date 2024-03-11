import {
    ProductDatasource,
    ProductDto,
    GeneralIdDto,
    ProductEntity,
    ProductRepository,
    ProductPartialDto
} from "../../domain";
import { PaginationDto } from "../../shared";

export class ProductRepositoryImpl implements ProductRepository {
    constructor(private readonly productDatasource: ProductDatasource) {}

    create = (productDto: ProductDto): Promise<ProductEntity> => {
        return this.productDatasource.create(productDto);
    };
    getAll = (paginationDto: PaginationDto): Promise<ProductEntity[]> => {
        return this.productDatasource.getAll(paginationDto);
    };
    getById = (productIdDto: GeneralIdDto): Promise<ProductEntity> => {
        return this.productDatasource.getById(productIdDto);
    };
    deleteById(productIdDto: GeneralIdDto): Promise<ProductEntity> {
        return this.productDatasource.deleteById(productIdDto);
    }
    updateById(productIdDto: GeneralIdDto, productDto: ProductDto): Promise<ProductEntity> {
        return this.productDatasource.updateById(productIdDto, productDto);
    }
    partialUpdateById(productIdDto: GeneralIdDto, productPartialDto: ProductPartialDto): Promise<ProductEntity> {
        return this.productDatasource.partialUpdateById(productIdDto, productPartialDto);
    }
}
