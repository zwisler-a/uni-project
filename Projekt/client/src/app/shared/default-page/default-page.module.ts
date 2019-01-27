import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPageComponent } from './default-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { SearchComponent } from './search/search.component';
import { MatSidenavModule, MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [DefaultPageComponent, SearchComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatSidenavModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule
    ]
})
export class DefaultPageModule {}
