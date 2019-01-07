import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFieldLinkComponent } from './item-field-link.component';
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
    let component: ItemFieldLinkComponent;
    let fixture: ComponentFixture<ItemFieldLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFieldLinkComponent],
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
        fixture = TestBed.createComponent(ItemFieldLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
