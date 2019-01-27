import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsModule } from '../items.module';
import { ItemDetailsComponent } from './item-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemStoreModule } from '../_item-store/item-store.module';

describe('ItemDetailsComponent', () => {
    let component: ItemDetailsComponent;
    let fixture: ComponentFixture<ItemDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [ItemsModule, RouterTestingModule, HttpClientTestingModule, ItemStoreModule],
            providers: [{ provide: TranslateService, useValue: {} }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
