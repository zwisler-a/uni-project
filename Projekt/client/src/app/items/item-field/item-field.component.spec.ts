import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFieldComponent } from './item-field.component';
import { ItemsModule } from '../items.module';

describe('ItemFieldComponent', () => {
  let component: ItemFieldComponent;
  let fixture: ComponentFixture<ItemFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ItemsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
