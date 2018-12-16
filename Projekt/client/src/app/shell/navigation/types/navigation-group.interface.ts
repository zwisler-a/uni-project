import { NavigationItem } from './navigation-item.interface';

/** Grouping of Navigation Items */
export interface NavigationGroup {
    /** Displayname of the Group */
    title: string;
    /** Items grouped in the group */
    items: NavigationItem[];
}
