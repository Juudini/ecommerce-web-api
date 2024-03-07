import {
    CategoryDatasource,
    CategoryDto,
    GeneralIdDto,
    CategoryEntity,
    CategoryRepository,
    CategoryPartialDto
} from "../../domain";
import { PaginationDto } from "../../shared";

export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(private readonly categoryDatasource: CategoryDatasource) {}

    create = (categoryDto: CategoryDto): Promise<CategoryEntity> => {
        return this.categoryDatasource.create(categoryDto);
    };
    getAll = (paginationDto: PaginationDto): Promise<CategoryEntity[]> => {
        return this.categoryDatasource.getAll(paginationDto);
    };
    getById = (categoryIdDto: GeneralIdDto): Promise<CategoryEntity> => {
        return this.categoryDatasource.getById(categoryIdDto);
    };
    deleteById(categoryIdDto: GeneralIdDto): Promise<CategoryEntity> {
        return this.categoryDatasource.deleteById(categoryIdDto);
    }
    updateById(categoryIdDto: GeneralIdDto, categoryDto: CategoryDto): Promise<CategoryEntity> {
        return this.categoryDatasource.updateById(categoryIdDto, categoryDto);
    }
    partialUpdateById(categoryIdDto: GeneralIdDto, categoryPartialDto: CategoryPartialDto): Promise<CategoryEntity> {
        return this.categoryDatasource.partialUpdateById(categoryIdDto, categoryPartialDto);
    }
}
