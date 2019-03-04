import { Role } from 'src/app/models/role.interface';

export interface User {
    id: number;
    companyId: number;
    name: String;
    email?: string;
    roles: Role[];
}
