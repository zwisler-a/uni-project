import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPermissionsComponent } from './types-permissions.component';

describe('TypesPermissionsComponent', () => {
  let component: TypesPermissionsComponent;
  let fixture: ComponentFixture<TypesPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
