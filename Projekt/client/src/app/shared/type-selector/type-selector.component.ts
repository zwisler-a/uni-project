import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypesService } from 'src/app/types/_type-store/types.service';

import { Type } from '../../models/type.interface';
import { TypeSelectEvent } from './type-selector-event.interface';

@Component({
    selector: 'app-type-selector',
    templateUrl: './type-selector.component.html',
    styleUrls: ['./type-selector.component.scss']
})
export class TypeSelectorComponent implements OnInit {
    @Output()
    selected = new EventEmitter<TypeSelectEvent>();

    @Input()
    disabled = false;

    @Input()
    value: TypeSelectEvent = { typeId: 0, fieldId: 0 };

    type: Type = { fields: [], id: 0, name: '' };

    @Input()
    withField = false;

    fieldSelectable = false;

    get types() {
        return this.typesService.types;
    }
    constructor(private typesService: TypesService) {}

    ngOnInit() {
        if (this.value.typeId) {
            this.typesService.getType(this.value.typeId).subscribe(type => {
                this.type = type;
            });
        }
    }

    selectType(type: Type) {
        if (!this.withField) {
            this.selected.emit({ typeId: type.id });
        } else {
            this.type = type;
            this.fieldSelectable = true;
        }
    }

    selectField(field) {
        if (this.withField) {
            this.selected.emit({ typeId: this.type.id, fieldId: field.id });
        }
    }

    get fieldValue() {
        const fieldId = this.value.fieldId;
        const foundField = this.type.fields.find(field => field.id + `` === fieldId + '');
        return foundField ? foundField.name : '';
    }

    /** Displayable value of an type */
    toItemTypeName(itemType: Type) {
        return itemType ? itemType.name : '';
    }
}
