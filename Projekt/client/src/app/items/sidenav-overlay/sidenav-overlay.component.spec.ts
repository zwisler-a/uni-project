import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavOverlayComponent } from './sidenav-overlay.component';

describe('SidenavOverlayComponent', () => {
  let component: SidenavOverlayComponent;
  let fixture: ComponentFixture<SidenavOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavOverlayComponent ]
    })
    .compileComponents();
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
