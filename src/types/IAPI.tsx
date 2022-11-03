export interface IHttpClient {
    baseUrl: string
    headers: IHeaders
}

export interface IHeaders {
    [key: string]: string
}
