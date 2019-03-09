import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './has-permission.directive';
import { PermissionService } from './permission.service';

@NgModule({
    declarations: [HasPermissionDirective],
    imports: [CommonModule],
    exports: [HasPermissionDirective]
})
export class PermissionModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PermissionModule,
            providers: [PermissionService]
        };
    }
    static forChild(): ModuleWithProviders {
        return {
            ngModule: PermissionModule,
            providers: []
        };
    }
}
