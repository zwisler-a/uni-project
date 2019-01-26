import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DefaultPageModule } from 'src/app/shared/default-page/default-page.module';

import { TypesModule } from '../types.module';
import { TypesListComponent } from './types-list.component';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';

describe('TypesListComponent', () => {
    let component: TypesListComponent;
    let fixture: ComponentFixture<TypesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TypesModule, RouterTestingModule, HttpClientTestingModule, DefaultPageModule],
            providers: [{ provide: DefaultPageComponent, useValue: { actions: { next: _ => {} } } }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
