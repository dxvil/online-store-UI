export interface IHttpClient {
    _baseUrl: string
    _headers: IHeaders
}

export interface IHeaders {
    [key: string]: string
}

export interface IProductError {
    error: string
    message: string
    statusCode: number
}

export interface ICategory {
    id: number
    name: string
    image: string
}

export type TCategories = ICategory[];

export interface IUser {
    id: number,
    name: string
    role: string
}

export type Login = {
	login: string,
	password: string
}

export type LoginErr = {
	message: string,
	statusCode: number
}

export interface IEmail {
    email: string
}

export interface INewUser {
    name: string
    email: string
    password: string
    avatar: string
}