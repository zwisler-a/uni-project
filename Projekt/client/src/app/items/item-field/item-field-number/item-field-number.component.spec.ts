import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ItemFieldNumberComponent } from './item-field-number.component';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('ItemFieldNumberComponent', () => {
    let component: ItemFieldNumberComponent;
    let fixture: ComponentFixture<ItemFieldNumberComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFieldNumberComponent],
            imports: [
                MatInputModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                TranslateTestingModule.withTranslations({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemFieldNumberComponent);
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
