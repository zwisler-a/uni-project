import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Service to catch all errors from item requests.
 * Offeres rxjs operators to handle an error
 */
@Injectable({
    providedIn: 'root'
})
export class ItemErrorService {
    constructor(private snackbar: MatSnackBar, private translate: TranslateService) {}

    /** operator to handle errors during updating an item */
    updateError(): any {
        return catchError(err => {
            this.translate.get('items.error.update').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    /** operator to handle all errors during creation of an item */
    createError(): any {
        return catchError(err => {
            this.translate.get('items.error.create').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    /** operator to handle errors during deletion */
    deleteError(): any {
        return catchError(err => {
            this.translate.get('items.error.delete').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    /** operator to handle errors during fetching of items */
    getItemError(): any {
        return catchError(err => {
            this.translate.get('items.error.get').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    private showError(message: any): void {
        this.snackbar.open(message, null, {
            duration: 2000,
            horizontalPosition: 'end'
        });
    }
}