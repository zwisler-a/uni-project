import { Injectable } from '@angular/core';
import { Observable, empty, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { TranslateService } from '@ngx-translate/core';
/**
 * A Service to open a confirm dialog
 */
@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {
    constructor(
        private dialog: MatDialog,
        private translate: TranslateService
    ) {}

    /**
     * Opens a dialog to confirm an action. Observable only returns a value if accepted
     * @param text Text or translate key for the content of the dialog
     * @param translate If the text should be translated using ngx-translate
     */
    open(text, translate = false): Observable<void> {
        const result = new Subject<void>();
        if (translate) {
            this.translate.get(text).subscribe(translation => {
                this.show(result, translation);
            });
            return result;
        }
        this.show(result, text);
        return result;
    }

    /**
     * @ignore
     * Wrapper to show mat dialog since it is called in two different ways in open()
     * @param result ~
     * @param text ~
     */
    private show(result, text) {
        this.dialog
            .open(ConfirmDialogComponent, { data: text })
            .afterClosed()
            .subscribe(res => {
                if (res) {
                    result.next();
                    result.complete();
                } else {
                    result.complete();
                }
            });
    }
}
