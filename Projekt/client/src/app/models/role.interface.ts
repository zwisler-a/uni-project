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

    /** Transform a role into a from the backend accepted form. (Bitmasking permissions) */
    static toBackendForm(role: IRole) {
        const toBitmask = (permissions: string[]) => 100;
        const transformTypes = types => {
            const typesMasked = {};
            for (const key in types) {
                if (types.hasOwnProperty(key)) {
                    typesMasked[key] = toBitmask(types[key]);
                }
            }
        };
        return {
            id: role.id,
            companyId: role.companyId,
            name: role.name,
            permission: toBitmask(role.permission),
            types: transformTypes(role.types)
        };
    }
}
