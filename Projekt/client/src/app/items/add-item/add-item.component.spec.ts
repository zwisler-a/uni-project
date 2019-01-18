import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemComponent } from './add-item.component';
import { ItemsModule } from '../items.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ItemStoreModule } from 'src/app/stores/item-store/item-store.module';

describe('AddItemComponent', () => {
    let component: AddItemComponent;
    let fixture: ComponentFixture<AddItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                ItemsModule,
                CommonModule,
                NoopAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                ItemStoreModule,
                TranslateTestingModule.withTranslations({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
