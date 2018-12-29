export interface User {
    id: number;
    companyId: number;
    username: String;
    email?: string;
    roles: number[];
}
