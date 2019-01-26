import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatIconModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { TypeNameModule } from '../type-name-pipe/type-name.module';
import { TypeSelectorComponent } from './type-selector.component';

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
                FlexLayoutModule,
                MatSnackBarModule,
                MatIconModule,
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
