import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeListComponent } from './item-type-list.component';

describe('ItemTypeListComponent', () => {
  let component: ItemTypeListComponent;
  let fixture: ComponentFixture<ItemTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
