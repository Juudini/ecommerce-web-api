type Sort = "asc" | "desc";

export interface PaginationProps {
    limit: number;
    page: number;
    sort: Sort;
}

export class PaginationDto {
    public readonly limit: number;
    public readonly page: number;
    public readonly sort: Sort;

    private constructor({ limit, page, sort }: PaginationProps) {
        this.limit = limit;
        this.page = page;
        this.sort = sort;
    }

    static create({ page = 1, limit = 10, sort = "asc" }): [string?, PaginationDto?] {
        const parsedPage = parseInt(String(page));
        const parsedLimit = parseInt(String(limit));

        if (isNaN(parsedPage) || isNaN(parsedLimit)) {
            return ["Page and Limit must be valid numbers"];
        }

        if (parsedLimit <= 0) {
            return ["Limit must be greater than 0"];
        }

        if (parsedPage <= 0) {
            return ["Page must be greater than 0"];
        }

        if (sort !== "asc" && sort !== "desc") {
            return ["Sort must be 'asc' or 'desc'"];
        }

        return [undefined, new PaginationDto({ limit: parsedLimit, page: parsedPage, sort })];
    }
}
