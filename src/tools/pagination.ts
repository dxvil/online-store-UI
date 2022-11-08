function pagination<T> (maxElementsPerPage: number, page: number, elements: T[]): T[] {
	if(page === 1) {
		return elements.slice(0, maxElementsPerPage);
	}
	return elements.slice(maxElementsPerPage * page, maxElementsPerPage * page + maxElementsPerPage);
}

function paginationSlicer(maxElementsPerPage: number, page: number): number {
	return maxElementsPerPage * page;
}

export { pagination, paginationSlicer };