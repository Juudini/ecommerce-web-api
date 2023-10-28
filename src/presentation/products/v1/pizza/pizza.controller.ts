import { Request, Response } from "express";
import {
    CustomError,
    PizzaDto,
    PizzaRepository,
    PizzaPartialDto,
    ProductIdDto,
    PizzaUseCase,
    PaginationDto,
    PaginationProps
} from "../../../../domain";

export class PizzaController {
    constructor(private readonly pizzaRepository: PizzaRepository) {}
    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    };

    createPizza = (req: Request, res: Response) => {
        const [error, pizzaDto] = PizzaDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new PizzaUseCase(this.pizzaRepository)
            .create(pizzaDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    getPizzas = (req: Request, res: Response) => {
        const { page, limit, sort } = req.query;
        const [error, paginationDto] = PaginationDto.create({ page, limit, sort } as unknown as PaginationProps);
        if (error) return res.status(400).json({ error });

        new PizzaUseCase(this.pizzaRepository)
            .getAll(paginationDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    getPizzaById = (req: Request, res: Response) => {
        const [error, productIdDto] = ProductIdDto.create(req.params.pid);
        if (error) return res.status(400).json({ error });

        new PizzaUseCase(this.pizzaRepository)
            .getById(productIdDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    deletePizzaById = (req: Request, res: Response) => {
        const [error, productIdDto] = ProductIdDto.create(req.params.pid);
        if (error) return res.status(400).json({ error });

        new PizzaUseCase(this.pizzaRepository)
            .deleteById(productIdDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    updatePizzaById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = ProductIdDto.create(req.params.pid);
        const [errorDto, pizzaDto] = PizzaDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new PizzaUseCase(this.pizzaRepository)
            .updateById(productIdDto!, pizzaDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    partialUpdatePizzaById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = ProductIdDto.create(req.params.pid);
        const [errorDto, pizzaPartialDto] = PizzaPartialDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new PizzaUseCase(this.pizzaRepository)
            .partialUpdateById(productIdDto!, pizzaPartialDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };
}
