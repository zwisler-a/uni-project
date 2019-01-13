import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPageComponent } from './types-page.component';
import { TypesModule } from '../types.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TypesPageComponent', () => {
    let component: TypesPageComponent;
    let fixture: ComponentFixture<TypesPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                TypesModule,
                TranslateTestingModule.withTranslations({}),
                RouterTestingModule,
                NoopAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
