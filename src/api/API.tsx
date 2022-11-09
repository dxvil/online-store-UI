import { IHttpClient, IHeaders, IProductError, TCategories, IUser, LoginErr } from "../types/IAPI";
import { IProduct } from "../types/interfaces";

class HttpClient implements IHttpClient {
	_baseUrl;
	_headers;
	constructor(options: IHttpClient) {
		this._baseUrl = options._baseUrl || "";
		this._headers = options._headers || {};
	}

	async _fetch<T>(endpoint: string, options = {}): Promise<T | undefined> {
		const res = await fetch(this._baseUrl + endpoint, 
			{
				...options,
				headers: this._headers});
		
		if (!res.ok) throw new Error(res.statusText);
		
		if (options && res.status !== 204)
			return res.json();
		
		return undefined;
	}

	set setHeader({key, value}: IHeaders) {
		this._headers[key]  = value;
	}

	getHeader({key}: IHeaders) {
		return this._headers[key];
	}

	get<T>(endpoint: string, options: object = {}) {
		return this._fetch<T>(endpoint, {
			...options,
			method: "GET"
		});
	}
    
	post<T>(endpoint: string, body: object, options: object = {}) {
		return this._fetch<T>(endpoint, {
			...options,
			parseResponse: false,
			body: body ? JSON.stringify(body) : undefined,
			method: "POST"
		});
	}
    
	put<T>(endpoint: string, body: object, options: object = {}) {
		return this._fetch<T>(endpoint, {
			...options,
			body: body ? JSON.stringify(body) : undefined,
			method: "PUT"
		});
	}
    
	patch<T>(endpoint: string, operations: object, options: object = {}) {
		return this._fetch<T>(endpoint, {
			parseResponse: false,
			...options,
			body: JSON.stringify(operations),
			method: "PATCH"
		});
	}
    
	delete<T>(endpoint: string, options: object = {}) {
		return this._fetch<T>(endpoint, {
			parseResponse: false,
			...options,
			method: "DELETE"
		});
	}
}

class ApiClient extends HttpClient {
	constructor(_baseUrl: string, _headers: IHeaders) {
		super({
			_baseUrl,
			_headers
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
	get authentication() {
		return {
			login: (email: string, password: string) => this.post<IUser | LoginErr>("/api/v1/auth/login", {"email": email, "password": password}),
			authentificate: (token: string) => {
				this._headers = {
					...this._headers,
					"Authorization": `Bearer ${token}`
				};
				return this.get<IUser | LoginErr>("/api/v1/auth/profile");
			}
		};
	}
}

export const api = new ApiClient("https://api.escuelajs.co", {
	"Content-Type": "application/json",
	"Accept": "*/*"
});