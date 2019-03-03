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
    ITEM_READ = 1,
    ITEM_WRITE = 2,
    TYPE_EDIT = 4,
    GLOBAL_FIELD = 8,
    LOCAL_ADMIN = 16,
    GLOBAL_ADMIN = 32
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