import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Service to handle errors from type requests
 */
@Injectable({
    providedIn: 'root'
})
export class TypeErrorService {
    constructor(private snackbar: MatSnackBar, private translate: TranslateService) {}

    /** operator to handle type delete errors */
    deleteError(): any {
        return catchError(err => {
            this.translate.get('types.error.delete').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    /** operator to handle type update errors */
    updateError(): any {
        return catchError(err => {
            this.translate.get('types.error.update').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    /** operator to handle type get errors */
    getError(): any {
        return catchError(err => {
            this.translate.get('types.error.get').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    /** operator to handle type create errors */
    createError(): any {
        return catchError(err => {
            this.translate.get('types.error.create').subscribe(message => this.showError(message));
            console.error(err);
            return throwError(err);
        });
    }

    /**
     * Helper to display a snackbar properly
     * @param message snackbar message
     */
    private showError(message: any): void {
        this.snackbar.open(message, null, {
            duration: 2000,
            horizontalPosition: 'end'
        });
    }
}
