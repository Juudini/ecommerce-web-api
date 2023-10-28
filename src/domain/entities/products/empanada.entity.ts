export class EmpanadaEntity {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public thumbnail?: string,
        public status?: boolean
    ) {}
}
