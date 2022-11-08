import { ICategory, IProduct } from "./interfaces";
import { IProductError } from "./IAPI";

export type FetchStatus = "notStarted" | "pending" | "done";
type ComponentsWithFetch = {
    singleProduct: FetchStatus,
    products: FetchStatus,
    productsByCategories: FetchStatus
}
export interface IProductsState {
    fetchStatus: ComponentsWithFetch
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
    product: IProduct | IProductError | null
}

interface CartItem extends IProduct {
    quintity: number
}

export interface CartState {
    items: CartItem[],
    quintity: number,
	price: number
}