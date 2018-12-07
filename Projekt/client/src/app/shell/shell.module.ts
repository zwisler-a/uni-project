import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import {
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
} from '@angular/material';
import { NavigationService } from './navigation/navigation.service';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
/**
 * App-Shell Module to contain eveything loaded on initial pageload
 */
@NgModule({
    declarations: [NavigationComponent, LoginComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule
    ],
    providers: [NavigationService]
})
export class ShellModule {}
