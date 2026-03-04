export interface QueryParams {
    page: number,
    pageSize: number,
    search: string,
    order: string,
    direction: 'asc' | 'desc' | ''
}