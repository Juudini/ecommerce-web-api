export class BeverageEntity {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public category: string,
        public thumbnail?: string,
        public status?: boolean
    ) {}
}
