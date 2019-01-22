## UI Data Stores

The UI stores its data in rxjs Observables to easier update the data in the components if necessary.

![diagramm](docs/dataflow.png)

### TypeStoreModule
This module is responsible for managing everthing type related.
It contains the TypeService which is used to create, delete, update and retrieve types. It automaticly updates its store accroding to changes made there. 

The TypeService contains the `_types` BehaviourSubject which contains the raw data retrieved from the API. (Why BehaviourSubject? It stores the last emitted value and emits it directly if an observer subscribes).

This data gets available inside the types Observable of the TypeService for use inside the App.

The `getType()` function reduces the types Observable to a single type. That way, if the types change, also an observer using a single type gets a new value emitted.

### ItemsStoreModule
This module is responsible for keeping track of the Items. Since the items used inside the UI have a different form than the once recieved from the backend it also takes care of transforming them properly.

The ItemService is used to update, delete, create and retrieve Items. It only stores items of the current displayed page. The page/pageSize/type which is stored can be changed via the `loadItems()` method.

Like in the TypeService, the ItemService contains a BehaviourSubject `_items`  which contains the data recieved from the API. The raw data is exposed in the `rawItems` Observable

The transformation happens inside the `ItemPipe` which transforms the ApiItems into Items. Since it uses the `getType()` method from the TypeService the resulting Items will get updated once the Types change!
