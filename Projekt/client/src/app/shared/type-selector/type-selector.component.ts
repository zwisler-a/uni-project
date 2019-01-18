import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { TypesService } from '../../stores/type-store/types.service';
import { Type } from '../../stores/type-store/types/type.interface';

@Component({
    selector: 'app-type-selector',
    templateUrl: './type-selector.component.html',
    styleUrls: ['./type-selector.component.scss']
})
export class TypeSelectorComponent implements OnInit {
    @Output()
    selected = new EventEmitter<Type>();

    @Input()
    disabled = false;

    @Input()
    value: number;

    get types() {
        return this.typesService.types;
    }
    constructor(private typesService: TypesService) {}

    ngOnInit() {}

    /** Displayable value of an type */
    toItemTypeName(itemType: Type) {
        return itemType ? itemType.name : '';
    }
}
