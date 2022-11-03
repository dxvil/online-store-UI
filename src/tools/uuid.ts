export const uuid = (): string => {
	let d = new Date().getTime();// Timestamp
	let d2 = ((typeof performance !== "undefined") && performance.now !== null && (performance.now() * 1000) !== null) || 0;// Time in microseconds since page-load or 0 if unsupported
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		let r = Math.random() * 16;// random number between 0 and 16
		if (d > 0) { // Use timestamp until depleted
			r = (d + r) % 16 | 0;
			d = Math.floor(d / 16);
		} else { // Use microseconds since page-load if supported
			r = (Number(d2) + r) % 16 | 0;
			d2 = Math.floor(Number(d2) / 16);
		}
		return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
	});
};