/** Represents all neccessary information about the state of a list */
export interface ListState {
    /** current page index */
    page?: number;
    /** items per page */
    perPage?: number;
    /** total amount of items available */
    total?: number;
    /** itemtype loaded */
    type?: number;
    /** field to order by */
    orderBy?: string;
    /** order */
    order?: 'asc' | 'desc';
    /** search query to filter the items */
    searchQuery?: string;
}
