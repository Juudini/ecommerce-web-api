export class DessertEntity {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public type: string,
        public thumbnail?: string,
        public status?: boolean
    ) {}
}
