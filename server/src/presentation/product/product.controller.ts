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
    constructor(private readonly productRepository: ProductRepository) {}
    private handleError = (err: unknown, res: Response) => {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    };

    createProduct = (req: Request, res: Response) => {
        const file = req.files;
        // eslint-disable-next-line prefer-const
        let [error, productDto] = ProductDto.create(req.body);
        if (error) return res.status(400).json({ error });

        productDto!.product_images = file as any;

        new ProductUseCase(this.productRepository)
            .create(productDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getProducts = (req: Request, res: Response) => {
        const { page, limit, sort } = req.query;
        const [error, paginationDto] = PaginationDto.create({ page, limit, sort } as unknown as PaginationProps);
        if (error) return res.status(400).json({ error });

        new ProductUseCase(this.productRepository)
            .getAll(paginationDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getProductById = (req: Request, res: Response) => {
        const [error, productIdDto] = GeneralIdDto.create(req.params.pid);
        if (error) return res.status(400).json({ error });

        new ProductUseCase(this.productRepository)
            .getById(productIdDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    deleteProductById = (req: Request, res: Response) => {
        const [error, productIdDto] = GeneralIdDto.create(req.params.pid);
        if (error) return res.status(400).json({ error });

        new ProductUseCase(this.productRepository)
            .deleteById(productIdDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    updateProductById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = GeneralIdDto.create(req.params.pid);
        const [errorDto, productDto] = ProductDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new ProductUseCase(this.productRepository)
            .updateById(productIdDto!, productDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    partialUpdateProductById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = GeneralIdDto.create(req.params.pid);
        const [errorDto, productPartialDto] = ProductPartialDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new ProductUseCase(this.productRepository)
            .partialUpdateById(productIdDto!, productPartialDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };
}
