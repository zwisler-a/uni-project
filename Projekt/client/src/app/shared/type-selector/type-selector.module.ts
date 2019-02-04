import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatIconModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { TypeStoreModule } from 'src/app/types/_type-store/type-store.module';

import { TypeSelectorComponent } from './type-selector.component';

@NgModule({
    declarations: [TypeSelectorComponent],
    imports: [CommonModule, TypeStoreModule.forChild(), MatAutocompleteModule, MatInputModule, TranslateModule, MatIconModule],
    exports: [TypeSelectorComponent]
})
export class TypeSelectorModule {}
