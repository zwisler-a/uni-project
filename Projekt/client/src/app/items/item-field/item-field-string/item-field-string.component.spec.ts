import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFieldStringComponent } from './item-field-string.component';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemFieldStringComponent', () => {
    let component: ItemFieldStringComponent;
    let fixture: ComponentFixture<ItemFieldStringComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFieldStringComponent],
            imports: [
                MatInputModule,
                FormsModule,
                FlexLayoutModule,
                NoopAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemFieldStringComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
