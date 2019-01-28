import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../shell/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class WsService {
    private ws: Observable<{ baseUrl: string; method: string; url: string; body: any }>;
    constructor(private authService: AuthService) {
        const ws = webSocket<any>('ws://localhost:3000/');
        this.authService.authChange.subscribe(_ => {
            ws.next({ token: this.authService.jwt });
        });
        this.ws = ws.asObservable();
    }

    forRoute(route: string) {
        return this.ws.pipe(
            filter(res => {
                return res.baseUrl === route;
            })
        );
    }
}
