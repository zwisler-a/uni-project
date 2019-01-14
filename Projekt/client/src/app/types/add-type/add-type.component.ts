import { Component, OnInit } from '@angular/core';
import { ApiItemType } from '../types/api-item-type.interface';
import { TypesService } from '../types.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-type',
    templateUrl: './add-type.component.html',
    styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {
    type: ApiItemType = { id: 0, name: '', fields: [] };

    constructor(private typesService: TypesService, private router: Router) {}

    ngOnInit() {}

    addField() {
        this.type.fields.push({
            id: 0,
            name: '',
            required: false,
            unique: false,
            type: 'string'
        });
    }

    removeField(field) {
        const fields = this.type.fields;
        fields.splice(fields.indexOf(field), 1);
    }

    save() {
        this.typesService.createType(this.type).subscribe(res => {
            this.router.navigate(['/types']);
        });
    }
}
