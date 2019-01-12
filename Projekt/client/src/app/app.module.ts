import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationService } from './shell/navigation/navigation.service';
import { ShellModule } from './shell/shell.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private navigationService: NavigationService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['de', 'en']);
    this.translate.use('de');
    this.navigationService.navigationModel = [
      {
        title: 'Inventar',
        items: [
          { label: 'Items', icon: 'dashboard', route: ['/items'] },
          { label: 'Test2', icon: 'dashboard', route: ['/2'] }
        ]
      }
    ];
  }
}
