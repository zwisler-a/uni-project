import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDetailComponent } from './type-detail.component';
import { TypesModule } from '../types.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('TypeDetailComponent', () => {
    let component: TypeDetailComponent;
    let fixture: ComponentFixture<TypeDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TypesModule,
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateTestingModule.withTranslations({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypeDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
