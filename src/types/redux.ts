import { ICategory, IProduct } from "./interfaces";

export interface IProductsState {
    allProducts: IProduct[]
    filteredProducts: IProduct[]
    searchItem: null | IProduct
    categories: ICategory[]
	productsListLength: number
    filteredListLength: number
    foundListLength: number
    foundItemsList: IProduct[]
    activeCategory: number | null
    input: string
}