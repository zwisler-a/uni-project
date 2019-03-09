import { NavigationItem } from './navigation-item.interface';
import { Permission } from 'src/app/models/permission.enum';

/** Grouping of Navigation Items */
export interface NavigationGroup {
    /** Displayname of the Group */
    title: string;
    /** Items grouped in the group */
    items: NavigationItem[];
    /** What permission is required to display the group */
    requiredPermission?: Permission[];
}
