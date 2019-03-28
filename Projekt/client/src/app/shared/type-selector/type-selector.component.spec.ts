import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatIconModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { TypeSelectorComponent } from './type-selector.component';
import { TypeStoreModule } from 'src/app/types/_type-store/type-store.module';
import { RouterTestingModule } from '@angular/router/testing';

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
                TypeStoreModule.forRoot(),
                RouterTestingModule.withRoutes([]),
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
