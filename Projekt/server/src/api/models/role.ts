import { ObjectValidator } from '../../util/object-validator';

export interface Role {
    id?: number;
    companyId?: number;
    name: string;
    permission: number;
    types: {
        [typeId: string]: number
    };
}

export enum Permission {
    ITEM_READ,
    ITEM_WRITE,
    TYPE_EDIT,
    LOCAL_ADMIN,
    GLOBAL_ADMIN
}

export enum PermissionType {
    ITEM_READ,
    ITEM_WRITE,
    TYPE_EDIT
}

export const ROLE = new ObjectValidator<Role>({
    type: Object,
    required: true,
    properties: {
        companyId: {
            type: Number,
        },
        name: {
            type: String,
            required: true,
            range: {
                min: 1,
                max: 64
            }
        },
        permission: {
            type: Number,
            required: true
        },
        types: {
            type: Object,
            required: true,
            elements: {
                type: Number,
                required: true
            }
        }
    }
});