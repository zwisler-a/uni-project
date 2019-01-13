import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavOverlayComponent } from './sidenav-overlay.component';
import { MatSidenavModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SidenavOverlayComponent', () => {
    let component: SidenavOverlayComponent;
    let fixture: ComponentFixture<SidenavOverlayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavOverlayComponent],
            imports: [
                MatSidenavModule,
                RouterTestingModule,
                NoopAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
