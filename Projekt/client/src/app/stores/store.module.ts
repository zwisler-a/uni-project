import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FieldsStoreModule } from './fields-store/fields-store.module';
import { ItemStoreModule } from './item-store/item-store.module';
import { TypeStoreModule } from './type-store/type-store.module';

/** Takes care of backend communication and storing data */
@NgModule({
    declarations: [],
    imports: [CommonModule, TypeStoreModule, FieldsStoreModule, ItemStoreModule]
})
export class StoreModule {}
