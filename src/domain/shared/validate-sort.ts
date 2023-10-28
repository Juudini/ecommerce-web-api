type SortOptions = {
    [key: string]: any;
};

export const validateSort = (sort: "asc" | "desc"): SortOptions => {
    const sortOptions: SortOptions = {
        asc: { price: 1 },
        desc: { price: -1 }
    };

    return sortOptions[sort];
};
