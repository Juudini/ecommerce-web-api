import { CategoryDto, GeneralIdDto, CategoryPartialDto, CategoryRepository } from "../index";
import { PaginationDto } from "../../shared";

interface ICategoryUseCase {
    create(categoryDto: CategoryDto): Promise<CategoryDto>;
    getAll(paginationDto: PaginationDto): Promise<CategoryDto[]>;
    getById(categoryIdDto: GeneralIdDto): Promise<CategoryDto>;
    deleteById(categoryIdDto: GeneralIdDto): Promise<CategoryDto>;
    updateById(categoryIdDto: GeneralIdDto, categoryDto: CategoryDto): Promise<CategoryDto>;
    partialUpdateById(categoryIdDto: GeneralIdDto, categoryPartialDto: CategoryPartialDto): Promise<CategoryDto>;
}

export class CategoryUseCase implements ICategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    create = async (categoryDto: CategoryDto): Promise<CategoryDto> => {
        return await this.categoryRepository.create(categoryDto);
    };
    getAll = async (paginationDto: PaginationDto): Promise<CategoryDto[]> => {
        return await this.categoryRepository.getAll(paginationDto);
    };

    getById = async (categoryIdDto: GeneralIdDto): Promise<CategoryDto> => {
        return await this.categoryRepository.getById(categoryIdDto);
    };

    deleteById = async (categoryIdDto: GeneralIdDto): Promise<CategoryDto> => {
        return await this.categoryRepository.deleteById(categoryIdDto);
    };

    updateById = async (categoryIdDto: GeneralIdDto, categoryDto: CategoryDto): Promise<CategoryDto> => {
        return await this.categoryRepository.updateById(categoryIdDto, categoryDto);
    };

    partialUpdateById = async (
        categoryIdDto: GeneralIdDto,
        categoryPartialDto: CategoryPartialDto
    ): Promise<CategoryDto> => {
        return await this.categoryRepository.partialUpdateById(categoryIdDto, categoryPartialDto);
    };
}
