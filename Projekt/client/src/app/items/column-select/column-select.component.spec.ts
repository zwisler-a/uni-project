import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSelectComponent } from './column-select.component';
import {
  MatAutocompleteModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { FieldsService } from '../_fields-store/fields.service';
import { FieldsStoreModule } from '../_fields-store/fields-store.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemStoreModule } from '../_item-store/item-store.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ColumnSelectComponent', () => {
  let component: ColumnSelectComponent;
  let fixture: ComponentFixture<ColumnSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnSelectComponent],
      imports: [
        MatAutocompleteModule,
        MatChipsModule,
        TranslateTestingModule.withTranslations({}),
        FieldsStoreModule,
        MatIconModule,
        NoopAnimationsModule,
        ItemStoreModule,
        MatInputModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
