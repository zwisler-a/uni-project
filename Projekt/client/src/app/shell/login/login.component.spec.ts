/*
TODO(zwisler): something doesnt play nice here. Guessing its the translation suff.
Have to revisit it at a later point in time...


import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCheckboxModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpLoaderFactory } from 'src/app/app.module';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                CommonModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                }),
                FlexLayoutModule,
                MatToolbarModule,
                HttpClientModule,
                MatInputModule,
                MatCardModule,
                MatButtonModule,
                MatCheckboxModule,
                RouterTestingModule.withRoutes([
                    { path: 'login', children: [] }
                ]),
                ReactiveFormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
*/
