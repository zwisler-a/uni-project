import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { Type } from '../../models/type.interface';
import { TypesService } from 'src/app/types/_type-store/types.service';
import { TypeField } from 'src/app/models/type-field.interface';

@Component({
    selector: 'app-type-selector',
    templateUrl: './type-selector.component.html',
    styleUrls: ['./type-selector.component.scss']
})
export class TypeSelectorComponent implements OnInit {
    @Output()
    selected = new EventEmitter<{ type: Type; field?: TypeField }>();

    @Input()
    disabled = false;

    @Input()
    value: number;

    @Input()
    fieldId: number;

    type: Type = { fields: [], id: 0, name: '' };

    @Input()
    withField = false;

    fieldSelectable = false;

    get types() {
        return this.typesService.types;
    }
    constructor(private typesService: TypesService) {}

    ngOnInit() {}

    selectType(type: Type) {
        if (!this.withField) {
            this.selected.emit({ type: type });
        } else {
            this.type = type;
            this.fieldSelectable = true;
        }
    }

    selectField(field) {
        if (this.withField) {
            this.selected.emit({ type: this.type, field: field });
        }
    }

    get fieldValue() {
        const foundField = this.type.fields.find(field => field.id + `` === this.fieldId + '');
        return foundField ? foundField.name : '';
    }

    /** Displayable value of an type */
    toItemTypeName(itemType: Type) {
        return itemType ? itemType.name : '';
    }
}
