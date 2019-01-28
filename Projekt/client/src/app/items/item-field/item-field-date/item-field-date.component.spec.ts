import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFieldDateComponent } from './item-field-date.component';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ItemFormControl } from '../../item-form-control';

describe('ItemFieldDateComponent', () => {
    let component: ItemFieldDateComponent;
    let fixture: ComponentFixture<ItemFieldDateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFieldDateComponent],
            imports: [
                MatInputModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                MatDatepickerModule,
                MatNativeDateModule,
                NoopAnimationsModule,
                TranslateTestingModule.withTranslations({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemFieldDateComponent);
        component = fixture.componentInstance;
        component.control = ItemFormControl.fromField({
            id: 0,
            name: 'test',
            required: false,
            unique: false,
            displayValue: '',
            type: 'boolean',
            value: ''
        });
        component.form = new FormGroup({
            test: component.control
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
