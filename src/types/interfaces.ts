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
	amountOfItems: number | null
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
    values?: ICategory | IProduct | null

}

export type TSettings<T> ={
	list: T[],
	context: "categories" | "products",
	modalEdit: boolean,
	onModalEdit: (value: boolean) => void
	setItemToEdit: (item: T) => void
	onModalCreate: (value: boolean) => void
};