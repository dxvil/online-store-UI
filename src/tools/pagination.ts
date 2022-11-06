function pagination<T> (maxElementsPerPage: number, page: number, elements: T[]): T[] {
	return elements.slice(maxElementsPerPage * page, maxElementsPerPage * page + maxElementsPerPage);
}

function paginationSlicer(maxElementsPerPage: number, page: number): number {
	return maxElementsPerPage * page;
}

export { pagination, paginationSlicer };