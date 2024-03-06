import { Request, Response } from "express";
import {
    CustomError,
    CategoryDto,
    CategoryRepository,
    CategoryPartialDto,
    GeneralIdDto,
    CategoryUseCase
} from "../../domain";
import { PaginationDto, PaginationProps } from "../../shared";

export class CategoryController {
    constructor(private readonly categoryRepository: CategoryRepository) {}
    private handleError = (err: unknown, res: Response) => {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    };

    createCategory = (req: Request, res: Response) => {
        const [error, categoryDto] = CategoryDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CategoryUseCase(this.categoryRepository)
            .create(categoryDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getCategories = (req: Request, res: Response) => {
        const { page, limit, sort } = req.query;
        const [error, paginationDto] = PaginationDto.create({ page, limit, sort } as unknown as PaginationProps);
        if (error) return res.status(400).json({ error });

        new CategoryUseCase(this.categoryRepository)
            .getAll(paginationDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    getCategoryById = (req: Request, res: Response) => {
        const [error, productIdDto] = GeneralIdDto.create(req.params.ctyid);
        if (error) return res.status(400).json({ error });

        new CategoryUseCase(this.categoryRepository)
            .getById(productIdDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    deleteCategoryById = (req: Request, res: Response) => {
        const [error, productIdDto] = GeneralIdDto.create(req.params.ctyid);
        if (error) return res.status(400).json({ error });

        new CategoryUseCase(this.categoryRepository)
            .deleteById(productIdDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    updateCategoryById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = GeneralIdDto.create(req.params.ctyid);
        const [errorDto, categoryDto] = CategoryDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new CategoryUseCase(this.categoryRepository)
            .updateById(productIdDto!, categoryDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };

    partialUpdateCategoryById = (req: Request, res: Response) => {
        const [errorId, productIdDto] = GeneralIdDto.create(req.params.ctyid);
        const [errorDto, categoryPartialDto] = CategoryPartialDto.create(req.body);

        if (errorId) return res.status(400).json({ errorId });
        if (errorDto) return res.status(400).json({ errorDto });

        new CategoryUseCase(this.categoryRepository)
            .partialUpdateById(productIdDto!, categoryPartialDto!)
            .then(data => res.json(data))
            .catch(err => this.handleError(err, res));
    };
}
