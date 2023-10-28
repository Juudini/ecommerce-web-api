import { DessertDto, ProductIdDto, DessertRepository, DessertPartialDto, PaginationDto } from "../../";

interface IDessertUseCase {
    create(dessertDto: DessertDto): Promise<DessertDto>;
    getAll(paginationDto: PaginationDto): Promise<DessertDto[]>;
    getById(productIdDto: ProductIdDto): Promise<DessertDto>;
    deleteById(productIdDto: ProductIdDto): Promise<DessertDto>;
    updateById(productIdDto: ProductIdDto, dessertDto: DessertDto): Promise<DessertDto>;
    partialUpdateById(productIdDto: ProductIdDto, dessertPartialDto: DessertPartialDto): Promise<DessertDto>;
}

export class DessertUseCase implements IDessertUseCase {
    constructor(private readonly dessertRepository: DessertRepository) {}

    create = async (dessertDto: DessertDto): Promise<DessertDto> => {
        return await this.dessertRepository.create(dessertDto);
    };
    getAll = async (paginationDto: PaginationDto): Promise<DessertDto[]> => {
        return await this.dessertRepository.getAll(paginationDto);
    };

    getById = async (productIdDto: ProductIdDto): Promise<DessertDto> => {
        return await this.dessertRepository.getById(productIdDto);
    };

    deleteById = async (productIdDto: ProductIdDto): Promise<DessertDto> => {
        return await this.dessertRepository.deleteById(productIdDto);
    };

    updateById = async (productIdDto: ProductIdDto, dessertDto: DessertDto): Promise<DessertDto> => {
        return await this.dessertRepository.updateById(productIdDto, dessertDto);
    };

    partialUpdateById = async (
        productIdDto: ProductIdDto,
        dessertPartialDto: DessertPartialDto
    ): Promise<DessertDto> => {
        return await this.dessertRepository.partialUpdateById(productIdDto, dessertPartialDto);
    };
}
