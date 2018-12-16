import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { SidenavControlButtonComponent } from './sidenav-control-button.component';
import { SidenavMode } from '../types/sidenav-mode.enum';
import { SidenavState } from '../types/sidenav-state.enum';

describe('SidenavControlButtonComponent', () => {
    let component: SidenavControlButtonComponent;
    let fixture: ComponentFixture<SidenavControlButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavControlButtonComponent],
            imports: [MatIconModule, MatButtonModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavControlButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should expand if collapsed & side', () => {
        component.mode = SidenavMode.side;
        component.state = SidenavState.collapsed;
        const spy = spyOn(component.expand, 'emit');
        component.do();
        expect(spy).toHaveBeenCalled();
    });

    it('should collapse if expanded & side', () => {
        component.mode = SidenavMode.side;
        component.state = SidenavState.expanded;
        const spy = spyOn(component.colapse, 'emit');
        component.do();
        expect(spy).toHaveBeenCalled();
    });

    it('should hide if expanded & over', () => {
        component.mode = SidenavMode.over;
        component.state = SidenavState.expanded;
        const spy = spyOn(component.hide, 'emit');
        component.do();
        expect(spy).toHaveBeenCalled();
    });
});
