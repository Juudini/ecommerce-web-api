import { EmpanadaDto, ProductIdDto, EmpanadaRepository, EmpanadaPartialDto, PaginationDto } from "../../";

interface IEmpanadaUseCase {
    create(empanadaDto: EmpanadaDto): Promise<EmpanadaDto>;
    getAll(paginationDto: PaginationDto): Promise<EmpanadaDto[]>;
    getById(productIdDto: ProductIdDto): Promise<EmpanadaDto>;
    deleteById(productIdDto: ProductIdDto): Promise<EmpanadaDto>;
    updateById(productIdDto: ProductIdDto, empanadaDto: EmpanadaDto): Promise<EmpanadaDto>;
    partialUpdateById(productIdDto: ProductIdDto, empanadaPartialDto: EmpanadaPartialDto): Promise<EmpanadaDto>;
}

export class EmpanadaUseCase implements IEmpanadaUseCase {
    constructor(private readonly empanadaRepository: EmpanadaRepository) {}

    create = async (empanadaDto: EmpanadaDto): Promise<EmpanadaDto> => {
        return await this.empanadaRepository.create(empanadaDto);
    };
    getAll = async (paginationDto: PaginationDto): Promise<EmpanadaDto[]> => {
        return await this.empanadaRepository.getAll(paginationDto);
    };

    getById = async (productIdDto: ProductIdDto): Promise<EmpanadaDto> => {
        return await this.empanadaRepository.getById(productIdDto);
    };

    deleteById = async (productIdDto: ProductIdDto): Promise<EmpanadaDto> => {
        return await this.empanadaRepository.deleteById(productIdDto);
    };

    updateById = async (productIdDto: ProductIdDto, empanadaDto: EmpanadaDto): Promise<EmpanadaDto> => {
        return await this.empanadaRepository.updateById(productIdDto, empanadaDto);
    };

    partialUpdateById = async (
        productIdDto: ProductIdDto,
        empanadaPartialDto: EmpanadaPartialDto
    ): Promise<EmpanadaDto> => {
        return await this.empanadaRepository.partialUpdateById(productIdDto, empanadaPartialDto);
    };
}
