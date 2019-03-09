import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from './role.service';

@NgModule({
    declarations: [],
    providers: [],
    imports: [CommonModule]
})
export class RolesStoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RolesStoreModule,
            providers: [RoleService]
        };
    }
    static forChild(): ModuleWithProviders {
        return {
            ngModule: RolesStoreModule,
            providers: []
        };
    }
}
