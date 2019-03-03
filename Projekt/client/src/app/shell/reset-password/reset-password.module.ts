import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResetPasswordComponent} from './reset-password.component';
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSnackBarModule, MatDialogModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {ChangePasswordComponent} from './change-password/change-password.component';


@NgModule({
    declarations: [
        ResetPasswordComponent,
        ChangePasswordComponent],
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
        MatDialogModule,
        RouterModule.forChild([{path: '', component: ResetPasswordComponent}]),
        ReactiveFormsModule
    ],
    entryComponents: []
})
export class ResetPasswordModule {
}
