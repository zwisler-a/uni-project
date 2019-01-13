import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, MatProgressBarModule, MatSortModule, MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ItemsListComponent } from './items-list.component';
/*
describe('ItemsListComponent', () => {
    let component: ItemsListComponent;
    let fixture: ComponentFixture<ItemsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsListComponent],
            imports: [
                NoopAnimationsModule,
                MatProgressBarModule,
                MatTableModule,
                MatSortModule,
                MatPaginatorModule,
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { data: of({ list: [] }) }
                }
            ]
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
});
*/
