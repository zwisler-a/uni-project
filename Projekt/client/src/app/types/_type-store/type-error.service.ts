import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TypeErrorService {
    constructor(private snackbar: MatSnackBar, private translate: TranslateService) {}

    deleteError(): any {
        return catchError(err => {
            this.translate.get('types.error.delete').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    updateError(): any {
        return catchError(err => {
            this.translate.get('types.error.update').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    getError(): any {
        return catchError(err => {
            this.translate.get('types.error.get').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    createError(): any {
        return catchError(err => {
            this.translate.get('types.error.create').subscribe(message => this.showError(message));
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
