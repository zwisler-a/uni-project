import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { Router, UrlSegment } from '@angular/router';
import { Item } from 'src/app/models/item.interface';

import { ItemFormControl } from '../../item-form-control';
import { ItemFormGroup } from '../../item-form-group';
import { TranslateService } from '@ngx-translate/core';

/**
 * A service to select an item out of the normal ui
 * It helps in guiding the user by redirecting and opening a snackbar
 * It also stores a state in which the item in question was.
 */
@Injectable({
    providedIn: 'root'
})
export class ItemFieldReferenceService {
    private reference: MatSnackBarRef<any>;
    private state: any;
    private forControl: ItemFormControl;
    private redir: string;

    constructor(private snackbar: MatSnackBar, private router: Router, private translate: TranslateService) {}

    /**
     * Starts the selection process of an item for a reference.
     * It opens up a snackbar and waits unitl the first item is clicked
     * @param forControl Control of the reference
     * @param state Current state of the item
     * @param redir Where to redirect to after selection is done
     */
    startSelectProcess(forControl: ItemFormControl, state: any, redir: string) {
        this.forControl = forControl;
        this.state = state;
        this.redir = redir;
        this.reference = this.snackbar.open(
            this.translate.instant('items.reference.selecting'),
            this.translate.instant('items.reference.cancel'),
            { duration: 0, panelClass: 'success' }
        );
        this.router.navigate(['/items', 'view', { outlets: { content: [0, 50, forControl.referenceType], detail: null } }]);
        this.reference.afterDismissed().subscribe(res => {
            if (this.redir) {
                this.router.navigateByUrl(this.redir);
            }
        });
    }

    /** Selects an item for the current selection process */
    select(item: Item) {
        if (this.state) {
            if (this.forControl.referenceType === item.typeId) {
                this.forControl.setValue(item.id);
                const referenceField = item.fields.find(field => field.id === this.forControl.referenceFieldId);
                this.forControl.reference = referenceField.value;
                this.forControl.referenceType = item.typeId;
                this.router.navigateByUrl(this.redir);
            } else {
                throw new Error('Wrong type');
            }
        }
    }

    /**
     * Gets the state in which the selection process is started and resets to be able to do another selection process
     */
    restoreState(): ItemFormGroup {
        const state = this.state;
        this.redir = null;
        this.state = undefined;
        this.reference.dismissWithAction();
        return state;
    }

    /** if it is in a selection process currently  */
    get isSelecting() {
        return !!this.state;
    }
}
