export interface IRole {
    id?: number;
    companyId?: number;
    name: string;
    /** Use bitmask {@see Permission} to extract values*/
    permission: number;
    /** Permissions for each type */
    types: {
        [typeId: string]: number;
    };
}

export class Role implements IRole {
    constructor(public id, public companyId, public name, public permission, public types) {}
}
