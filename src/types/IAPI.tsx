export interface IHttpClient {
    baseUrl: string
    headers: IHeaders
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
}

export type TCategories = ICategory[];