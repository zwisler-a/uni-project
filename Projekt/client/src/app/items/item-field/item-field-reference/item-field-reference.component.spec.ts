import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFieldReferenceComponent } from './item-field-reference.component';
import {
    MatInputModule,
    MatIconModule,
    MatTooltipModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('ItemFieldLinkComponent', () => {
    let component: ItemFieldReferenceComponent;
    let fixture: ComponentFixture<ItemFieldReferenceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFieldReferenceComponent],
            imports: [
                MatInputModule,
                FormsModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                RouterTestingModule,
                MatIconModule,
                MatTooltipModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemFieldReferenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
