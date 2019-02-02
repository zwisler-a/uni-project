import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule, MatProgressBarModule, MatSortModule, MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, BehaviorSubject } from 'rxjs';
import { TypeStoreModule } from 'src/app/types/_type-store/type-store.module';

import { ItemStoreModule } from '../_item-store/item-store.module';
import { ItemsListComponent } from './items-list.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { DefaultPageModule } from 'src/app/shared/default-page/default-page.module';
import { FieldsStoreModule } from '../_fields-store/fields-store.module';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';
import { USE_VALUE } from '@angular/core/src/di/injector';
import { ItemsModule } from '../items.module';

describe('ItemsListComponent', () => {
    let component: ItemsListComponent;
    let fixture: ComponentFixture<ItemsListComponent>;
    const defaultPageMock = { actions: new Subject(), search: new BehaviorSubject('') };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                ItemsModule,
                NoopAnimationsModule,
                MatProgressBarModule,
                MatTableModule,
                MatSortModule,
                MatPaginatorModule,
                TypeStoreModule,
                FieldsStoreModule,
                ItemStoreModule,
                FlexLayoutModule,
                RouterTestingModule.withRoutes([]),
                TranslateTestingModule.withTranslations({}),
                HttpClientTestingModule
            ],
            providers: [{ provide: DefaultPageComponent, useValue: defaultPageMock }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should find a displayValue by name', () => {
        expect(component).toBeTruthy();
        const value = component.findByName([{ name: 'test', displayValue: 'test2' }] as any, 'test');
        expect(value).toBe('test2');
    });

    it('should navigate on open', inject([Router], router => {
        expect(component).toBeTruthy();
        const spy = spyOn(router, 'navigate');
        component.open({ typeId: 1 } as any);
        expect(spy).toHaveBeenCalled();
    }));
});
