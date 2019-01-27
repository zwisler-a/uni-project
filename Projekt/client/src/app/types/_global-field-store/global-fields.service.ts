import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TypeField } from 'src/app/models/type-field.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GlobalFieldsService {
    readonly baseUrl = environment.baseUrl + `/fields`;

    private _fields = new BehaviorSubject<TypeField[]>([
        { name: 'Test', id: 0, required: false, type: '', unique: false },
        { name: 'Test2', id: 2, required: false, type: '', unique: false }
    ]);
    readonly fields = this._fields.asObservable();

    constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

    loadFields() {
        return this.http.get<TypeField[]>(this.baseUrl).pipe(
            map(res => {
                this._fields.next(res);
                return this.fields;
            })
        );
    }

    updateField(field): any {
        return this.http.post<TypeField>(this.baseUrl, field).pipe(
            tap(res => {
                let fields = this._fields.getValue();
                fields = fields.filter(filterField => filterField.id + '' !== field.id + '');
                fields.push(res);
                this._fields.next(fields);
            }),
            catchError(err => {
                this.snackbar.open('Something went wrong!', null, { duration: 2000, horizontalPosition: 'end' });
                return throwError(err);
            })
        );
    }

    deleteField(id: any): any {
        return this.http.delete(this.baseUrl + '/' + id).pipe(
            tap(res => {
                let fields = this._fields.getValue();
                fields = fields.filter(filterField => filterField.id + '' !== id + '');
                this._fields.next(fields);
            }),
            catchError(err => {
                this.snackbar.open('Something went wrong!', null, { duration: 2000, horizontalPosition: 'end' });
                return throwError(err);
            })
        );
    }

    createField(field: TypeField): any {
        return this.http.post<TypeField>(this.baseUrl, field).pipe(
            tap(res => {
                const fields = this._fields.getValue();
                fields.push(res);
                this._fields.next(fields);
            }),
            catchError(err => {
                this.snackbar.open('Something went wrong!', null, { duration: 2000, horizontalPosition: 'end' });
                return throwError(err);
            })
        );
    }
}
