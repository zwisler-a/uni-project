import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@NgModule({
    declarations: [],
    imports: [CommonModule]
})
export class UserStoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserStoreModule,
            providers: [UserService, UserResolver]
        };
    }
    static forChild(): ModuleWithProviders {
        return {
            ngModule: UserStoreModule,
            providers: []
        };
    }
}
