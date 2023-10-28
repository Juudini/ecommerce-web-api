import { PizzaDto, ProductIdDto, PizzaRepository, PizzaPartialDto, PaginationDto } from "../../index";

interface IPizzaUseCase {
    create(pizzaDto: PizzaDto): Promise<PizzaDto>;
    getAll(paginationDto: PaginationDto): Promise<PizzaDto[]>;
    getById(productIdDto: ProductIdDto): Promise<PizzaDto>;
    deleteById(productIdDto: ProductIdDto): Promise<PizzaDto>;
    updateById(productIdDto: ProductIdDto, pizzaDto: PizzaDto): Promise<PizzaDto>;
    partialUpdateById(productIdDto: ProductIdDto, pizzaPartialDto: PizzaPartialDto): Promise<PizzaDto>;
}

export class PizzaUseCase implements IPizzaUseCase {
    constructor(private readonly pizzaRepository: PizzaRepository) {}

    create = async (pizzaDto: PizzaDto): Promise<PizzaDto> => {
        return await this.pizzaRepository.create(pizzaDto);
    };
    getAll = async (paginationDto: PaginationDto): Promise<PizzaDto[]> => {
        return await this.pizzaRepository.getAll(paginationDto);
    };

    getById = async (productIdDto: ProductIdDto): Promise<PizzaDto> => {
        return await this.pizzaRepository.getById(productIdDto);
    };

    deleteById = async (productIdDto: ProductIdDto): Promise<PizzaDto> => {
        return await this.pizzaRepository.deleteById(productIdDto);
    };

    updateById = async (productIdDto: ProductIdDto, pizzaDto: PizzaDto): Promise<PizzaDto> => {
        return await this.pizzaRepository.updateById(productIdDto, pizzaDto);
    };

    partialUpdateById = async (productIdDto: ProductIdDto, pizzaPartialDto: PizzaPartialDto): Promise<PizzaDto> => {
        return await this.pizzaRepository.partialUpdateById(productIdDto, pizzaPartialDto);
    };
}
