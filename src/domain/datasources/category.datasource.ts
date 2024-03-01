import { CategoryDto, GeneralIdDto, CategoryPartialDto, CategoryEntity, PaginationDto } from "../index";

export abstract class CategoryDatasource {
    abstract create(categoryDto: CategoryDto): Promise<CategoryEntity>;

    abstract getAll(paginationDto: PaginationDto): Promise<CategoryEntity[]>;

    abstract getById(categorydDto: GeneralIdDto): Promise<CategoryEntity>;

    abstract deleteById(categoryIdDto: GeneralIdDto): Promise<CategoryEntity>;

    abstract updateById(categoryIdDto: GeneralIdDto, categoryDto: CategoryDto): Promise<CategoryEntity>;

    abstract partialUpdateById(
        categoryIdDto: GeneralIdDto,
        categoryPartialDto: CategoryPartialDto
    ): Promise<CategoryEntity>;
}
