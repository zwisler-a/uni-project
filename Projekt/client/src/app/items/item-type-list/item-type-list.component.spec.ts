import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeListComponent } from './item-type-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItemTypeListComponent', () => {
    let component: ItemTypeListComponent;
    let fixture: ComponentFixture<ItemTypeListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemTypeListComponent],
            imports: [
                RouterTestingModule,
                MatListModule,
                HttpClientTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemTypeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
