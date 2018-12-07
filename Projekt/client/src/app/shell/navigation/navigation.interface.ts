/** Single navigational point */
export interface NavigationItem {
    /** Icon to be displayed infront of the item */
    icon: string;
    /** Displayname of the item */
    label: string;
    /** Angular router route */
    route: (string | number)[];
}

/** Grouping of Navigation Items */
export interface NavigationGroup {
    /** Displayname of the Group */
    title: string;
    /** Items grouped in the group */
    items: NavigationItem[];
}
