import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { ItemErrorService } from './item-error.service';
import { ItemPipe } from './item-pipe.service';
import { ItemService } from './item.service';

@NgModule({
    declarations: [ItemPipe],
    imports: [CommonModule, MatSnackBarModule, TranslateModule],
    providers: [ItemService, ItemErrorService, ItemPipe]
})
export class ItemStoreModule {}
