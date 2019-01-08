import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogModule } from './confirm-dialog.module';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

describe('ConfirmDialogComponent', () => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ConfirmDialogModule, TranslateModule.forRoot()],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: '' }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
