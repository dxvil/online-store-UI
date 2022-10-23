export interface IHttpClient {
    baseUrl: string
    headers: IHeaders
}

export interface IHeaders {
    [key: string]: string
}

export interface IProduct { 
    id:	number	
    title: string	
    price: number	
    description: string	
    category: number	
    images:	string[]
}