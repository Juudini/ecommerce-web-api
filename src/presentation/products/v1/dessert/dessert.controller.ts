import { Request, Response } from "express";
import {
    CustomError,
    DessertDto,
    DessertRepository,
    DessertPartialDto,
    ProductIdDto,
    DessertUseCase,
    PaginationProps,
    PaginationDto
} from "../../../../domain";

export class DessertController {
    constructor(private readonly dessertRepository: DessertRepository) {}
    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    };

    createDessert = (req: Request, res: Response) => {
        const [error, dessertDto] = DessertDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new DessertUseCase(this.dessertRepository)
            .create(dessertDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    getDesserts = (req: Request, res: Response) => {
        const { page, limit, sort } = req.query;
        const [error, paginationDto] = PaginationDto.create({ page, limit, sort } as unknown as PaginationProps);
        if (error) return res.status(400).json({ error });

        new DessertUseCase(this.dessertRepository)
            .getAll(paginationDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    getDessertById = (req: Request, res: Response) => {
        const [error, productIdDto] = ProductIdDto.create(req.params.dstid);
        if (error) return res.status(400).json({ error });

        new DessertUseCase(this.dessertRepository)
            .getById(productIdDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    deleteDessertById = (req: Request, res: Response) => {
        const [error, productIdDto] = ProductIdDto.create(req.params.dstid);
        if (error) return res.status(400).json({ error });

        new DessertUseCase(this.dessertRepository)
            .deleteById(productIdDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    updateDessertById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = ProductIdDto.create(req.params.dstid);
        const [errorDto, dessertDto] = DessertDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new DessertUseCase(this.dessertRepository)
            .updateById(productIdDto!, dessertDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    partialUpdateDessertById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = ProductIdDto.create(req.params.dstid);
        const [errorDto, dessertPartialDto] = DessertPartialDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new DessertUseCase(this.dessertRepository)
            .partialUpdateById(productIdDto!, dessertPartialDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };
}
