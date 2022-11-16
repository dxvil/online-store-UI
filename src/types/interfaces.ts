import { IProductError } from "./IAPI";

export interface ICategory {
	id: number
	name: string
	image: string
}

export interface INewCategory {
	name: string
	image: string
}

export interface IProduct {
	id: number
	title: string
	price: number
	description: string
	category: ICategory
	images: string[]
}

export interface IPagination {
	amountOfItems: () => number
	pageOfItems: number
	pageSize: number
	setPageOfItems?: (page: number) => void
}

export interface INoItem extends IProductError {
    link: string
}

export interface IProductCounter {
    product: IProduct | IProductError | null
    isLiked?: boolean
    setIsLiked?: (x: boolean) => void
}

export type EditModal = {
    open: boolean,
    handleClose: (value: boolean) => void,
    mode: "create" | "edit"
	defaultCategoriesValues?: ICategory | undefined
	defaultProductValues?: IProduct | undefined
	context: "categories" | "products"
}

export type TSettings<T> ={
	list: T[],
	context: "categories" | "products",
	modalEdit: boolean,
	onModalEdit: (value: boolean) => void
	setItemToEdit: (item: T) => void
	onModalCreate: (value: boolean) => void
};

export interface INewProduct {
	id: number
	title: string
	price: number
	description: string
	categodyId: number
	images: string[]
}

export interface IProductForm {
    values: IProduct | undefined
    onChange: (data: Partial<IProduct> | INewProduct) => void
}

export interface ICategoriesForm {
	values: ICategory | undefined
	onChange: (data: INewCategory | undefined) => void
}

export type AdminContext = "products" | "categories";

export interface IProfileMenu {
	setContext: (context: AdminContext) => void
}