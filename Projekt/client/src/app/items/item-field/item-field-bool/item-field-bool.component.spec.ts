import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { ItemFieldBoolComponent } from './item-field-bool.component';

describe('ItemFieldBoolComponent', () => {
    let component: ItemFieldBoolComponent;
    let fixture: ComponentFixture<ItemFieldBoolComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFieldBoolComponent],
            imports: [
                MatInputModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                MatCheckboxModule,
                TranslateTestingModule.withTranslations({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemFieldBoolComponent);
        component = fixture.componentInstance;
        component.form = new FormGroup({
            test: new FormControl('')
        });
        component.name = 'test';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
