import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFieldReferenceComponent } from './item-field-reference.component';
import {
    MatInputModule,
    MatIconModule,
    MatTooltipModule
} from '@angular/material';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('ItemFieldLinkComponent', () => {
    let component: ItemFieldReferenceComponent;
    let fixture: ComponentFixture<ItemFieldReferenceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFieldReferenceComponent],
            imports: [
                MatInputModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                RouterTestingModule,
                MatIconModule,
                MatTooltipModule,
                TranslateTestingModule.withTranslations({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemFieldReferenceComponent);
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
