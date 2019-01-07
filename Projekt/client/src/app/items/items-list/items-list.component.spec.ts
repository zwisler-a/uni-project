import {
    async,
    ComponentFixture,
    TestBed,
    inject
} from '@angular/core/testing';

import { ItemsListComponent } from './items-list.component';
import {
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
} from '@angular/material';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { FieldsService } from '../fields.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

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
                    useValue: { data: of({ fields: ['test'] }) }
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
    it('should have data from activated route', () => {
        expect(component.displayedColumns).toContain('test');
    });
});
