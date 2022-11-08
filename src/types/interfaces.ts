import { IProductError } from "./IAPI";

export interface ICategory {
	id: number
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
