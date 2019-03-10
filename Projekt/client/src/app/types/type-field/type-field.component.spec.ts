import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFieldComponent } from './type-field.component';
import { TypesModule } from '../types.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TypeFieldComponent', () => {
    let component: TypeFieldComponent;
    let fixture: ComponentFixture<TypeFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TypesModule, TranslateTestingModule.withTranslations({}), NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypeFieldComponent);
        component = fixture.componentInstance;
        component.field = { id: 0, name: '', required: false, type: 0, unique: false };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
