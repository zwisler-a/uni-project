import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyStoreModule } from './company/_company-store/company-store.module';
import { navMenu } from './nav.config';
import { PermissionModule } from './permission/permission.module';
import { RolesStoreModule } from './roles/_roles-store/roles-store.module';
import { StoreModule } from './shared/store/store.module';
import { NavigationService } from './shell/navigation/navigation.service';
import { ShellModule } from './shell/shell.module';
import { GlobalFieldStoreModule } from './types/_global-field-store/global-field-store.module';
import { TypeStoreModule } from './types/_type-store/type-store.module';
import { UserStoreModule } from './user/_user-store/user-store.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        ShellModule,
        StoreModule,
        GlobalFieldStoreModule,
        TypeStoreModule.forRoot(),
        CompanyStoreModule.forRoot(),
        UserStoreModule.forRoot(),
        PermissionModule.forRoot(),
        RolesStoreModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500, horizontalPosition: 'end' } }],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private navigationService: NavigationService, private translate: TranslateService) {
        this.navigationService.navigationModel = navMenu;
        this.translate.addLangs(['de', 'en']);
        this.translate.use('de');
    }
}
