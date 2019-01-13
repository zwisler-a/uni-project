import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectorComponent } from './language-selector.component';
import { MatMenuModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageSelectorComponent ],
      imports: [MatMenuModule],
      providers: [{provide: TranslateService, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
