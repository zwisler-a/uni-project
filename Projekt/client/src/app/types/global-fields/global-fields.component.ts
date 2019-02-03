import { Component, OnInit } from '@angular/core';
import { GlobalFieldsService } from '../_global-field-store/global-fields.service';
import { TypeFieldComponent } from '../type-field/type-field.component';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { TypeField } from 'src/app/models/type-field.interface';

@Component({
    selector: 'app-global-fields',
    templateUrl: './global-fields.component.html',
    styleUrls: ['./global-fields.component.scss']
})
export class GlobalFieldsComponent implements OnInit {
    newField: TypeField = {
        id: 0,
        name: '',
        required: true,
        unique: false,
        type: 'string'
    };

    get fields() {
        return this.globalFields.fields;
    }

    constructor(
        private globalFields: GlobalFieldsService,
        private snackbar: MatSnackBar,
        private confirm: ConfirmDialogService,
        private translate: TranslateService
    ) {}

    ngOnInit() {
        this.globalFields.loadFields().subscribe();
    }

    save(input: TypeFieldComponent) {
        this.globalFields.updateField(input.field).subscribe(res => {
            const text = this.translate.instant('types.global.success');
            this.snackbar.open(text, null, { duration: 2000, horizontalPosition: 'end', panelClass: 'success' });
            input.edit = false;
        });
    }

    delete(id) {
        this.confirm.open('types.global.confirmDelete', true).subscribe(res => {
            this.globalFields.deleteField(id).subscribe();
        });
    }

    create() {
        this.globalFields.createField(this.newField).subscribe(res => {
            this.newField = {
                id: 0,
                name: '',
                required: true,
                unique: false,
                type: 'string'
            };
        });
    }
}
