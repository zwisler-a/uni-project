import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [SearchComponent],
    imports: [CommonModule, TranslateModule],
    exports: [SearchComponent]
})
export class SearchModule {}
