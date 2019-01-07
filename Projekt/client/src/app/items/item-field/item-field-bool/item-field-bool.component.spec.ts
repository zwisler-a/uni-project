import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFieldBoolComponent } from './item-field-bool.component';
import { MatInputModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemFieldBoolComponent', () => {
    let component: ItemFieldBoolComponent;
    let fixture: ComponentFixture<ItemFieldBoolComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFieldBoolComponent],
            imports: [
                MatInputModule,
                FormsModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                MatCheckboxModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemFieldBoolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
