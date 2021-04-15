export type ProductType = {
    id: number,
    name: string,
    price: number,
    color: string,
    catigories: string,
    description: string,
    shortDescr: string,
    image: string,
    salePrice: number | null,
    sale: boolean,
    top: boolean,
    wish: boolean,
}