import { ICategory, IProduct } from "./interfaces";
import { INewUser, IUser, TCategories } from "./IAPI";

export type FetchStatus = "notStarted" | "pending" | "done";

type ComponentsWithFetch = {
    productsStage: FetchStatus,
    productsByCategoriesStage: FetchStatus
}

export interface IProductsState {
    fetchStatus: ComponentsWithFetch
    allProducts: IProduct[]
    filteredProducts: IProduct[]
}

interface CartItem extends IProduct {
    quintity: number
}

export interface CartState {
    items: CartItem[],
    quintity: number
}

export type UserReducer = {
    isLogin: boolean,
	user: undefined | IUser
    newUser: undefined | Partial<INewUser>
    isCreatingNewUser: boolean
}

export type CategoriesReducer = {
    categories: TCategories
}