import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeListComponent } from './item-type-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ItemStoreModule } from '../_item-store/item-store.module';
import { TypeStoreModule } from 'src/app/types/_type-store/type-store.module';

describe('ItemTypeListComponent', () => {
    let component: ItemTypeListComponent;
    let fixture: ComponentFixture<ItemTypeListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemTypeListComponent],
            imports: [
                RouterTestingModule,
                ItemStoreModule,
                TypeStoreModule,
                TranslateTestingModule.withTranslations({}),
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
