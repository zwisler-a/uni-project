import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MatListModule,
    MatSidenavModule,
    MatIconModule
} from '@angular/material';

import { ItemFieldFileComponent } from './item-field-file.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemFieldFileComponent', () => {
    let component: ItemFieldFileComponent;
    let fixture: ComponentFixture<ItemFieldFileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFieldFileComponent],
            imports: [
                MatSidenavModule,
                MatListModule,
                MatIconModule,
                NoopAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemFieldFileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
