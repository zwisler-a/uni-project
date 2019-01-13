import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material';

import { ItemsModule } from '../items.module';
import { ItemPageComponent } from './item-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { FlexLayoutModule } from '@angular/flex-layout';
/*
describe('ItemPageComponent', () => {
    let component: ItemPageComponent;
    let fixture: ComponentFixture<ItemPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                MatSidenavModule,
                NoopAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                FlexLayoutModule,
                ItemsModule,
                TranslateTestingModule.withTranslations({})
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
*/
