import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { Storable } from './storable.interface';
import { StoreConfig } from './store-config.interface';
import { Store } from './store.class';
import { Subject } from 'rxjs';

/** Service to help creating a store. Avoids the need to provide services ect ... */
@Injectable({ providedIn: 'root' })
export class StoreFactoryService {
    private defaultConfig: StoreConfig = {
        baseUrl: '',
        timeToLive: 1000 * 60 * 3, // 3 minutes is default
        errorKeys: {
            create: 'error.create',
            delete: 'error.delete',
            get: 'error.get',
            getAll: 'error.getAll',
            update: 'error.update'
        },
        urls: {
            create: '',
            delete: ':id',
            get: ':id',
            getAll: '',
            update: ':id'
        }
    };

    private _resetAllStores = new Subject<void>();
    /** Triggered when all stores reload */
    resetAllStores = this._resetAllStores.asObservable();

    constructor(private httpClient: HttpClient, private snackbar: MatSnackBar, private translate: TranslateService) {}

    /**
     * Creates a new Store and adds missing config values with the default values
     * @param config Configuration of the Store
     */
    create<T extends Storable>(config: StoreConfig) {
        // fill with default values
        const fullConfig = Object.assign({}, this.defaultConfig, config);
        // if there is a error key base, append it on all error keys
        if (fullConfig.errorKeyBase) {
            const errorConfig = {};
            Object.keys(fullConfig.errorKeys).forEach(key => {
                errorConfig[key] = fullConfig.errorKeyBase + fullConfig.errorKeys[key];
            });
            fullConfig.errorKeys = errorConfig;
        }

        return new Store<T>(this.httpClient, this.translate, this.snackbar, fullConfig, this.resetAllStores);
    }

    /**
     * WARNING!
     * This reloads all stores created by this factory! This may couse some errors or loosing of data!
     */
    forceReset() {
        this._resetAllStores.next();
    }
}
