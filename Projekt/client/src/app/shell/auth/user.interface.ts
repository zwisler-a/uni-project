export interface User {
    id: number;
    companyId: number;
    name: String;
    email?: string;
    roles: number[];
}
