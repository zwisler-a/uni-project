import { ObjectValidator } from './object-validator';

export interface Role {
    id: number;
    companyId: number;
    name: string;
    permission: Buffer | RolePermission[];
    tablePermission: RoleTablePermission[];
}

export interface RoleTablePermission {
    roleId: number;
    typeId: number;
    permission: Buffer | RolePermission[];
}

export interface RolePermission {
    type: PermissionType;
    allowed: boolean;
}

export enum PermissionType {
    ITEM_READ,
    ITEM_WRITE,
    TYPE_EDIT
}

export const ROLE = new ObjectValidator<Role>({
    companyId: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    permission: {
        type: Array,
        required: true,
        elements: {
            type: {
                type: Number,
                required: true
            },
            allowed: {
                type: Boolean,
                required: true
            }
        }
    },
    permissions: {
        type: Array,
        elements: {
            typeId: {
                type: Number,
                required: true
            },
            permission: {
                type: Array,
                required: true,
                elements: {
                    type: {
                        type: Number,
                        required: true
                    },
                    allowed: {
                        type: Boolean,
                        required: true
                    }
                }
            }
        }
    }
});