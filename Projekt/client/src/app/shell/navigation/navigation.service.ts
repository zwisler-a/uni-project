import { Injectable } from '@angular/core';
import { NavigationGroup } from './navigation.interface';

/**
 * Service to configure the navigation displayed
 */
@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private _navigationModel: NavigationGroup[];
    constructor() {}

    /** Set the navigation */
    set navigationModel(val: NavigationGroup[]) {
        this._navigationModel = val;
    }

    /** Retrieve the navigation */
    get navigationModel(): NavigationGroup[] {
        return this._navigationModel;
    }
}
