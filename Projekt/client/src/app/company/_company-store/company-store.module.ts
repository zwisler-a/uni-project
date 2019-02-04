import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from 'src/app/shared/store/store.module';

import { CompanyPipe } from './company.pipe';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';

@NgModule({
    declarations: [CompanyPipe],
    imports: [CommonModule, StoreModule],
    exports: [CompanyPipe]
})
export class CompanyStoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CompanyStoreModule,
            providers: [CompanyService, CompanyResolver]
        };
    }
    static forChild(): ModuleWithProviders {
        return {
            ngModule: CompanyStoreModule,
            providers: []
        };
    }
}
