import { CategoryDto, CategoryEntity, CategoryPartialDto, GeneralIdDto, PaginationDto } from "../index";

export abstract class CategoryRepository {
    abstract create(categoryDto: CategoryDto): Promise<CategoryEntity>;

    abstract getAll(paginationDto: PaginationDto): Promise<CategoryEntity[]>;

    abstract getById(categoryIdDto: GeneralIdDto): Promise<CategoryEntity>;

    abstract deleteById(categoryIdDto: GeneralIdDto): Promise<CategoryEntity>;

    abstract updateById(categoryIdDto: GeneralIdDto, categoryDto: CategoryDto): Promise<CategoryEntity>;

    abstract partialUpdateById(
        categoryIdDto: GeneralIdDto,
        pizzaPartialDto: CategoryPartialDto
    ): Promise<CategoryEntity>;
}
