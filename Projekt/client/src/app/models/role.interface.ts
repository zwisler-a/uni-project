export interface IRole {
    id?: number;
    companyId?: number;
    name: string;
    permission: PERMISSIONS[];
    types: {
        [typeId: string]: PERMISSIONS[];
    };
}

export enum PERMISSIONS {
    GLOBAL_ADMIN = 'global',
    LOCAL_ADMIN = 'local',
    ITEM_READ = 'read',
    ITEM_WRITE = 'write',
    TYPE_EDIT = 'edit'
}

export class Role implements IRole {
    constructor(public id, public companyId, public name, public permission, public types) {}
}
