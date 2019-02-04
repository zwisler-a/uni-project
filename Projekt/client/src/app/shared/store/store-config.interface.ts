/**
 * Configuration of Store
 */
export interface StoreConfig {
    /** Base of all requests made */
    baseUrl: string;
    /** How long should the store kept valid. If store is invalid it gets reloaded */
    timeToLive?: number;
    /**
     * Where the requests should go. The urls can be parameterized with :<key>.
     * The key gets taken from the passed object
     */
    urls?: {
        getAll?: string;
        get?: string;
        create?: string;
        delete?: string;
        update?: string;
    };
    /** Gets added to the front of each error key */
    errorKeyBase?: string;
    /** Used to determine which text should be displayed. There are ngx-translate keys. */
    errorKeys?: {
        getAll?: string;
        get?: string;
        create?: string;
        delete?: string;
        update?: string;
    };
}
