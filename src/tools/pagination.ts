function pagination<T> (maxElementsPerPage: number, page: number, elements: T[], amountOfPages: number): T[] {
	return elements.slice(maxElementsPerPage * page, maxElementsPerPage * page + maxElementsPerPage);
}

function paginationSlicer(maxElementsPerPage: number, page: number): number {
	return maxElementsPerPage * page;
}

export { pagination, paginationSlicer };