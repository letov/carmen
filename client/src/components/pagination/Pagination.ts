export interface IPagination {
    currentPage: number;
    itemsPerPage: number;
    skip(): number;
    take(): number;
}

export class Pagination implements IPagination {
    currentPage = 1;
    itemsPerPage = Number(import.meta.env.VITE_PAGINATION_ITEMS_PER_PAGE);
    skip = () => (this.currentPage - 1) * this.itemsPerPage;
    take = () => this.itemsPerPage;
}