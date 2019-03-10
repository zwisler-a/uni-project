import NodeCache from 'node-cache';

export class Cache<T> {
    cache: NodeCache;

    constructor(options: NodeCache.Options) {
        this.cache = new NodeCache(options);
    }

    set(key: string, value: T): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.cache.set(key, value, (error: any, data: boolean) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    get(key: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.cache.get<T>(key, (error: any, data: T) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    del(key: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.cache.del(key, (error: any, data: number) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    ttl(key: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.cache.ttl(key, (error: any, data: boolean) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
}