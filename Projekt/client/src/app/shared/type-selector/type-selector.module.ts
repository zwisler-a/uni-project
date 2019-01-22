import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { TypeNameModule } from '../type-name-pipe/type-name.module';
import { TypeSelectorComponent } from './type-selector.component';

@NgModule({
    declarations: [TypeSelectorComponent],
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatInputModule,
        TypeNameModule,
        TranslateModule
    ],
    exports: [TypeSelectorComponent]
})
export class TypeSelectorModule {}
