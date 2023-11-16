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
} from "../../../domain";

export class DessertController {
    constructor(private readonly dessertRepository: DessertRepository) {}
    private handleError = (err: unknown, res: Response) => {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    };

    createDessert = (req: Request, res: Response) => {
        const [error, dessertDto] = DessertDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new DessertUseCase(this.dessertRepository)
            .create(dessertDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getDesserts = (req: Request, res: Response) => {
        const { page, limit, sort } = req.query;
        const [error, paginationDto] = PaginationDto.create({ page, limit, sort } as unknown as PaginationProps);
        if (error) return res.status(400).json({ error });

        new DessertUseCase(this.dessertRepository)
            .getAll(paginationDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getDessertById = (req: Request, res: Response) => {
        const [error, productIdDto] = ProductIdDto.create(req.params.dstid);
        if (error) return res.status(400).json({ error });

        new DessertUseCase(this.dessertRepository)
            .getById(productIdDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    deleteDessertById = (req: Request, res: Response) => {
        const [error, productIdDto] = ProductIdDto.create(req.params.dstid);
        if (error) return res.status(400).json({ error });

        new DessertUseCase(this.dessertRepository)
            .deleteById(productIdDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    updateDessertById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = ProductIdDto.create(req.params.dstid);
        const [errorDto, dessertDto] = DessertDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new DessertUseCase(this.dessertRepository)
            .updateById(productIdDto!, dessertDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    partialUpdateDessertById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = ProductIdDto.create(req.params.dstid);
        const [errorDto, dessertPartialDto] = DessertPartialDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new DessertUseCase(this.dessertRepository)
            .partialUpdateById(productIdDto!, dessertPartialDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };
}
