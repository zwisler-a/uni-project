import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { TypesModule } from '../types.module';
import { GlobalFieldsComponent } from './global-fields.component';

describe('GlobalFieldsComponent', () => {
    let component: GlobalFieldsComponent;
    let fixture: ComponentFixture<GlobalFieldsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                TranslateTestingModule.withTranslations({}),
                MatButtonModule,
                MatSnackBarModule,
                TypesModule
            ],
            providers: [{ provide: Location, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GlobalFieldsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
