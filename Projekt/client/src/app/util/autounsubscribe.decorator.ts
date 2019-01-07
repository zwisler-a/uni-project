/**
 * Goes through all properties of an object and tries to find the unsubscribe method.
 * If found calls it once ngOnDestroy on the component is called
 * @param blackList Properies which should not be unsubscibed on ngOnDestroy
 */
export function AutoUnsubscribe(blackList = []) {
    return function(constructor) {
        const original = constructor.prototype.ngOnDestroy;

        constructor.prototype.ngOnDestroy = function() {
            for (const prop of Object.keys(this)) {
                const property = this[prop];
                if (!blackList.includes(prop)) {
                    if (
                        property &&
                        typeof property.unsubscribe === 'function'
                    ) {
                        property.unsubscribe();
                    }
                }
            }
            if (original && typeof original === 'function') {
                original.apply(this, arguments);
            }
        };
    };
}
