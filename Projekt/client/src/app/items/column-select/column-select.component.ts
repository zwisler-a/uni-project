import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete,
  MatDialogRef,
  MatAutocompleteTrigger
} from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FieldsService } from '../_fields-store/fields.service';

@Component({
  selector: 'app-column-select',
  templateUrl: './column-select.component.html',
  styleUrls: ['./column-select.component.scss']
})
export class ColumnSelectComponent implements OnInit {
  selectable = false;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  columnCtrl = new FormControl();
  availableColumns: Observable<string[]>;
  private columnsUpdate = new BehaviorSubject<void>(null);
  columns: string[] = [];

  @ViewChild('columnInput') permissionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autoTrigger') matAutocompleteTrigger: MatAutocompleteTrigger;
  constructor(private fieldService: FieldsService) {
    this.availableColumns = this.fieldService.displayableColumns;
    this.fieldService.displayColumns.subscribe(cols => {
      this.columns = JSON.parse(JSON.stringify(cols));
    });
    this.columnsUpdate.subscribe(() => {
      this.fieldService._displayColumns.next(this.columns);
    });
  }

  ngOnInit() {}

  add(event: MatChipInputEvent): void {
    // Add permission only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our permission
      if ((value || '').trim()) {
        this.columns.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.columnsUpdate.next(null);
      this.columnCtrl.setValue(null);
    }
  }

  remove(permission: string): void {
    const index = this.columns.indexOf(permission);

    if (index >= 0) {
      this.columns.splice(index, 1);
      this.columnsUpdate.next(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.columns.push(event.option.viewValue);
    this.permissionInput.nativeElement.value = '';
    this.columnsUpdate.next(null);
    this.columnCtrl.setValue(null);
    setTimeout(() => {
      this.matAutocompleteTrigger.openPanel();
    });
  }
}
