import {
    DessertDatasource,
    DessertDto,
    ProductIdDto,
    DessertEntity,
    DessertRepository,
    DessertPartialDto,
    PaginationDto
} from "../../../domain";

export class DessertRepositoryImpl implements DessertRepository {
    constructor(private readonly dessertDatasource: DessertDatasource) {}

    create = (dessertDto: DessertDto): Promise<DessertEntity> => {
        return this.dessertDatasource.create(dessertDto);
    };
    getAll = (paginationDto: PaginationDto): Promise<DessertEntity[]> => {
        return this.dessertDatasource.getAll(paginationDto);
    };
    getById = (productIdDto: ProductIdDto): Promise<DessertEntity> => {
        return this.dessertDatasource.getById(productIdDto);
    };
    deleteById(productIdDto: ProductIdDto): Promise<DessertEntity> {
        return this.dessertDatasource.deleteById(productIdDto);
    }
    updateById(productIdDto: ProductIdDto, dessertDto: DessertDto): Promise<DessertEntity> {
        return this.dessertDatasource.updateById(productIdDto, dessertDto);
    }
    partialUpdateById(productIdDto: ProductIdDto, dessertPartialDto: DessertPartialDto): Promise<DessertEntity> {
        return this.dessertDatasource.partialUpdateById(productIdDto, dessertPartialDto);
    }
}
