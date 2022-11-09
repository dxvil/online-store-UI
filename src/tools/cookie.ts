const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate()+1);
export const cookieName = "login";
export const onSetCookie = (token: string) => {
	document.cookie = `${cookieName}=${token}; expires=${tomorrow}; Secure`;
};

export const onGetCookie = (name: string): string | null =>{
	const nameLenPlus = (name.length + 1);
	return document.cookie
		.split(";")
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0] || null;
};

export const onDeleteCookie = (name: string) => {
	document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};