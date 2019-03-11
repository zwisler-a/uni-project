import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePasswordComponent} from './change-password.component';
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSnackBarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FlexLayoutModule,
        MatToolbarModule,
        HttpClientModule,
        MatInputModule,
        MatCardModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatButtonModule,
        MatCheckboxModule,
        RouterModule.forChild([{path: '', component: ChangePasswordComponent}]),
        ReactiveFormsModule
    ]
})
export class ChangePasswordModule {}
