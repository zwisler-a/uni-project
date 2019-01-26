import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { Type } from '../../models/type.interface';
import { TypesService } from 'src/app/types/_type-store/types.service';

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
