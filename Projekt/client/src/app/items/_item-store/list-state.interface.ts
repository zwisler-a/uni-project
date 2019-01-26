export interface ListState {
    page?: number;
    perPage?: number;
    total?: number;
    type?: number;
    orderBy?: string;
    order?: 'asc' | 'desc';
    searchQuery?: string;
}
