import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
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
    declarations: [LoginComponent],
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
        RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
        ReactiveFormsModule
    ]
})
export class LoginModule {}
