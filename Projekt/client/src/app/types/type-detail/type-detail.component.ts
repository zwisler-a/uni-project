import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiItemType } from '../types/api-item-type.interface';
import { TypesService } from '../types.service';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';

@Component({
    selector: 'app-type-detail',
    templateUrl: './type-detail.component.html',
    styleUrls: ['./type-detail.component.scss']
})
export class TypeDetailComponent implements OnInit {
    type: ApiItemType;
    edit = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private typesService: TypesService,
        private confirm: ConfirmDialogService,
        private router: Router
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            this.type = data.type;
        });
    }

    addField() {
        this.type.fields.push({
            name: '',
            id: 0,
            required: false,
            type: 'string',
            unique: false
        });
    }

    delete() {
        this.confirm.open('types.edit.confirmDelete', true).subscribe(() => {
            this.typesService.deleteType(this.type.id).subscribe(() => {
                this.router.navigate(['/types']);
            });
        });
    }

    save() {
        this.typesService.updateType(this.type).subscribe(() => {
            this.router.navigate(['/types', this.type.id]);
        });
    }
}
