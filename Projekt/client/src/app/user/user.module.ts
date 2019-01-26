import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { DefaultPageModule } from '../shared/default-page/default-page.module';
import { RouterModule } from '@angular/router';
import { userRoutes } from './routes';
import { MatListModule, MatIconModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';

@NgModule({
    declarations: [UserListComponent, UserDetailComponent],
    imports: [
        CommonModule,
        DefaultPageModule,
        RouterModule.forChild(userRoutes),
        MatListModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
        ConfirmDialogModule,
        MatToolbarModule
    ]
})
export class UserModule {}
