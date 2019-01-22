import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ItemErrorService {
    constructor(
        private snackbar: MatSnackBar,
        private translate: TranslateService
    ) {}

    updateError(): any {
        return catchError(err => {
            this.translate
                .get('items.error.update')
                .subscribe(message => this.showError(message));
            return throwError(err);
        });
    }

    createError(): any {
        return catchError(err => {
            this.translate
                .get('items.error.create')
                .subscribe(message => this.showError(message));
            return throwError(err);
        });
    }

    deleteError(): any {
        return catchError(err => {
            this.translate
                .get('items.error.delete')
                .subscribe(message => this.showError(message));
            return throwError(err);
        });
    }

    getItemError(): any {
        return catchError(err => {
            this.translate
                .get('items.error.get')
                .subscribe(message => this.showError(message));
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
