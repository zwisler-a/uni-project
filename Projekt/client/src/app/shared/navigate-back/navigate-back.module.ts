import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigateBackDirective } from './navigate-back.directive';

@NgModule({
    declarations: [NavigateBackDirective],
    imports: [CommonModule],
    exports: [NavigateBackDirective]
})
export class NavigateBackModule {}
