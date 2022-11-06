import { IHttpClient, IHeaders, IProductError, TCategories } from "../types/IAPI";
import { IProduct } from "../types/interfaces";

class HttpClient implements IHttpClient {
	baseUrl;
	headers;
	constructor(options: IHttpClient) {
		this.baseUrl = options.baseUrl || "";
		this.headers = options.headers || {};
	}

	async _fetch<T>(endpoint: string, options = {}): Promise<T | undefined> {
		const res = await fetch(this.baseUrl + endpoint, {
			...options,
			headers: this.headers
		});
    
		if (res.status !== 204) {
			return res.json();
		}
			
    
		return undefined;
	}

	set setHeader({key, value}: IHeaders) {
		this.headers[key]  = value;
	}

	getHeader({key}: IHeaders) {
		return this.headers[key];
	}

	get<T>(endpoint: string, options: object = {}) {
		return this._fetch<T>(endpoint, {
			...options,
			method: "GET"
		});
	}
    
	post(endpoint: string, body: object, options: object = {}) {
		return this._fetch(endpoint, {
			...options,
			body: body ? JSON.stringify(body) : undefined,
			method: "POST"
		});
	}
    
	put(endpoint: string, body: object, options: object = {}) {
		return this._fetch(endpoint, {
			...options,
			body: body ? JSON.stringify(body) : undefined,
			method: "PUT"
		});
	}
    
	patch(endpoint: string, operations: object, options: object = {}) {
		return this._fetch(endpoint, {
			parseResponse: false,
			...options,
			body: JSON.stringify(operations),
			method: "PATCH"
		});
	}
    
	delete(endpoint: string, options: object = {}) {
		return this._fetch(endpoint, {
			parseResponse: false,
			...options,
			method: "DELETE"
		});
	}
}

class ApiClient extends HttpClient {
	constructor(baseUrl: string) {
		super({
			baseUrl,
			headers: {}
		});
	}
	get products() {
		return {
			getAll: (offset?: string, limit?: string) => this.get<IProduct[] | undefined>(!offset ? "/api/v1/products" : `/api/v1/products?offset=${offset}&limit=${limit}`),
			get: (id: number) => this.get<IProduct | IProductError>(`/api/v1/products/${id}`),
			delete: (id: number) => this.delete(`/api/v1/products/${id}`),
			create: (product: IProduct) => this.post("/api/v1/products/", product),
			update: (product: IProduct, id: number) => this.put(`/api/v1/products/${id}`, product)
		};
	}
	get categories() {
		return {
			getAllByCategory: (categoryId: number) => this.get<IProduct[] | undefined>(`/api/v1/categories/${categoryId}/products`),
			get: () => this.get<TCategories | undefined>("/api/v1/categories"),
		};
	}
}

export const api = new ApiClient("https://api.escuelajs.co");