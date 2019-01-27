import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalFieldsComponent } from './global-fields.component';
import { MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TypesModule } from '../types.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
