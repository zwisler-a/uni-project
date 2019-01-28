import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WsService } from './ws.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [WsService]
})
export class WsModule {
    constructor(private ws: WsService) {}
}
