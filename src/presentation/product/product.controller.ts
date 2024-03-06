import { Request, Response } from "express";
import {
    CustomError,
    ProductDto,
    ProductRepository,
    ProductPartialDto,
    GeneralIdDto,
    ProductUseCase
} from "../../domain";
import { PaginationDto, PaginationProps } from "../../shared";

export class ProductController {
    constructor(private readonly pizzaRepository: ProductRepository) {}
    private handleError = (err: unknown, res: Response) => {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    };

    createProduct = (req: Request, res: Response) => {
        const [error, pizzaDto] = ProductDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new ProductUseCase(this.pizzaRepository)
            .create(pizzaDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getProducts = (req: Request, res: Response) => {
        const { page, limit, sort } = req.query;
        const [error, paginationDto] = PaginationDto.create({ page, limit, sort } as unknown as PaginationProps);
        if (error) return res.status(400).json({ error });

        new ProductUseCase(this.pizzaRepository)
            .getAll(paginationDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getProductById = (req: Request, res: Response) => {
        const [error, productIdDto] = GeneralIdDto.create(req.params.pid);
        if (error) return res.status(400).json({ error });

        new ProductUseCase(this.pizzaRepository)
            .getById(productIdDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    deleteProductById = (req: Request, res: Response) => {
        const [error, productIdDto] = GeneralIdDto.create(req.params.pid);
        if (error) return res.status(400).json({ error });

        new ProductUseCase(this.pizzaRepository)
            .deleteById(productIdDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    updateProductById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = GeneralIdDto.create(req.params.pid);
        const [errorDto, pizzaDto] = ProductDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new ProductUseCase(this.pizzaRepository)
            .updateById(productIdDto!, pizzaDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    partialUpdateProductById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = GeneralIdDto.create(req.params.pid);
        const [errorDto, pizzaPartialDto] = ProductPartialDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new ProductUseCase(this.pizzaRepository)
            .partialUpdateById(productIdDto!, pizzaPartialDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };
}
