import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './shell/shell.module';
import { NavigationService } from './shell/navigation/navigation.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ShellModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private navigationService: NavigationService) {
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
