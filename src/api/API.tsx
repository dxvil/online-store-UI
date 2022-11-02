import { IHttpClient, IHeaders, IProduct } from "../types/IAPI";


class HttpClient implements IHttpClient {
	baseUrl;
	headers;
	constructor(options: IHttpClient) {
		this.baseUrl = options.baseUrl || "";
		this.headers = options.headers || {};
	}

	async _fetch(endpoint: string, options = {}): Promise<string | object | undefined | null> {
		const res = await fetch(this.baseUrl + endpoint, {
			...options,
			headers: this.headers
		});
    
		if (!res.ok) throw new Error(res.statusText);
    
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

	get(endpoint: string, options: object = {}) {
		return this._fetch(endpoint, {
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
			getAll: () => this.get("/api/v1/products"),
			get: (id: number) => this.get(`/api/v1/products/${id}`),
			delete: (id: number) => this.delete(`/api/v1/products/${id}`),
			create: (product: IProduct) => this.post("/api/v1/products/", product),
			update: (product: IProduct, id: number) => this.put(`/api/v1/products/${id}`, product)
		};
	}
	get categories() {
		return {
			getAllByCategory: (categoryId: number) => this.get(`/api/v1/categories/${categoryId}/products`),
			get: () => this.get("/api/v1/categories"),
		};
	}
}

export const api = new ApiClient("https://api.escuelajs.co");