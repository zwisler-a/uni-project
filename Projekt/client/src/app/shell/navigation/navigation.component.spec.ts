import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule
} from '@angular/material';
import { NavigationService } from './navigation.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationComponent],
            imports: [
                RouterTestingModule,
                MatProgressBarModule,
                MatToolbarModule,
                MatIconModule,
                MatButtonModule,
                FlexLayoutModule
            ],
            providers: [NavigationService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TODO
});
