import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSnackBarModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [ResetPasswordComponent],
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
        RouterModule.forChild([{ path: '', component: ResetPasswordComponent }]),
        ReactiveFormsModule
    ],
    entryComponents: []
})
export class ResetPasswordModule {}
