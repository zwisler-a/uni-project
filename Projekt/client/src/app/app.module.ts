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
                title: 'Group',
                items: [
                    { label: 'Test', icon: 'dashboard', route: ['/1'] },
                    { label: 'Test2', icon: 'dashboard', route: ['/2'] }
                ]
            }
        ];
    }
}
