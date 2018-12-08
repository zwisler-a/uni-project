import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { NavigationGroupComponent } from './navigation/navigation-group/navigation-group.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationService } from './navigation/navigation.service';
import { SidenavControlButtonComponent } from './navigation/sidenav-control-button/sidenav-control-button.component';
import { RouterLoadingIndicatorComponent } from './router-loading-indicator/router-loading-indicator.component';

/**
 * App-Shell Module to contain eveything loaded on initial pageload
 */
@NgModule({
    declarations: [
        NavigationComponent,
        RouterLoadingIndicatorComponent,
        SidenavControlButtonComponent,
        NavigationGroupComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
        MatListModule
    ],
    providers: [NavigationService]
})
export class ShellModule {}
