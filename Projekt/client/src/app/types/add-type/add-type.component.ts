import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from 'src/app/models/type.interface';
import { TypesService } from '../_type-store/types.service';

/**
 * UI to create a new Type
 */
@Component({
    selector: 'app-add-type',
    templateUrl: './add-type.component.html',
    styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {
    /** type which gets created */
    type: Type = { id: 0, name: '', fields: [] };

    constructor(private typesService: TypesService, private router: Router) {}

    ngOnInit() {}

    /** Add a new field to the type */
    addField() {
        this.type.fields.push({
            id: 0,
            name: '',
            required: false,
            unique: false,
            type: 'string'
        });
    }

    /** Remove a field from the type */
    removeField(field) {
        const fields = this.type.fields;
        fields.splice(fields.indexOf(field), 1);
    }

    /** Create the new type */
    save() {
        this.typesService.createType(this.type).subscribe(res => {
            this.router.navigate(['/types', 'view', { outlets: { detail: [res.id] } }]);
        });
    }
}
