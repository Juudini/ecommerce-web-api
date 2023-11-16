import { Request, Response } from "express";
import {
    CustomError,
    EmpanadaDto,
    EmpanadaRepository,
    EmpanadaPartialDto,
    ProductIdDto,
    EmpanadaUseCase,
    PaginationDto,
    PaginationProps
} from "../../../domain";

export class EmpanadaController {
    constructor(private readonly empanadaRepository: EmpanadaRepository) {}
    private handleError = (err: unknown, res: Response) => {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    };

    createEmpanada = (req: Request, res: Response) => {
        const [error, empanadaDto] = EmpanadaDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new EmpanadaUseCase(this.empanadaRepository)
            .create(empanadaDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getEmpanadas = (req: Request, res: Response) => {
        const { page, limit, sort } = req.query;
        const [error, paginationDto] = PaginationDto.create({ page, limit, sort } as unknown as PaginationProps);
        if (error) return res.status(400).json({ error });

        new EmpanadaUseCase(this.empanadaRepository)
            .getAll(paginationDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getEmpanadaById = (req: Request, res: Response) => {
        const [error, productIdDto] = ProductIdDto.create(req.params.empid);
        if (error) return res.status(400).json({ error });

        new EmpanadaUseCase(this.empanadaRepository)
            .getById(productIdDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    deleteEmpanadaById = (req: Request, res: Response) => {
        const [error, productIdDto] = ProductIdDto.create(req.params.empid);
        if (error) return res.status(400).json({ error });

        new EmpanadaUseCase(this.empanadaRepository)
            .deleteById(productIdDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    updateEmpanadaById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = ProductIdDto.create(req.params.empid);
        const [errorDto, empanadaDto] = EmpanadaDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new EmpanadaUseCase(this.empanadaRepository)
            .updateById(productIdDto!, empanadaDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    partialUpdateEmpanadaById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = ProductIdDto.create(req.params.empid);
        const [errorDto, empanadaPartialDto] = EmpanadaPartialDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new EmpanadaUseCase(this.empanadaRepository)
            .partialUpdateById(productIdDto!, empanadaPartialDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };
}
