import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSelectorComponent } from './type-selector.component';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { TypeNameModule } from '../type-name-pipe/type-name.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TypeSelectorComponent', () => {
    let component: TypeSelectorComponent;
    let fixture: ComponentFixture<TypeSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TypeSelectorComponent],
            imports: [
                MatAutocompleteModule,
                MatInputModule,
                NoopAnimationsModule,
                TypeNameModule,
                HttpClientTestingModule,
                TranslateTestingModule.withTranslations({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypeSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
