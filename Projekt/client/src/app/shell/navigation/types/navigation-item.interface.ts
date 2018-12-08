/** Single navigational point */
export interface NavigationItem {
    /** Icon to be displayed infront of the item */
    icon: string;
    /** Displayname of the item */
    label: string;
    /** Angular router route */
    route: (string | number)[];
}
