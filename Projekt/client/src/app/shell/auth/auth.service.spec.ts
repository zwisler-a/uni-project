import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { AuthenticateResponse } from './authenticate.response';

const test_jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG' +
    '9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

describe('AuthService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([
                    { path: 'auth/login', children: [] },
                    { path: '', children: [] }
                ])
            ]
        })
    );

    /*
    it('should navigate to login if no jwt in localstorage', () => {
        const router: Router = TestBed.get(Router);
        const spy = spyOn(router, 'navigate');
        const service: AuthService = TestBed.get(AuthService);
        expect(spy).toHaveBeenCalledWith(['/auth/login']);
    });
    */

    it('should not navigate if jwt is in localstorage', () => {
        localStorage.setItem(AuthService.LOCALSTROAGE_KEY, test_jwt);
        const router: Router = TestBed.get(Router);
        const spy = spyOn(router, 'navigate');
        const service: AuthService = TestBed.get(AuthService);
        expect(spy).not.toHaveBeenCalled();
        // cleanup
        localStorage.removeItem(AuthService.LOCALSTROAGE_KEY);
    });

    it('should call the backend on authentication', inject(
        [HttpTestingController],
        (controller: HttpTestingController) => {
            const service: AuthService = TestBed.get(AuthService);
            service.login('test', 'pw').subscribe();
            const req = controller.expectOne(service.authenticateUrl);
            expect(req.request.body.name).toBe('test');
            expect(req.request.body.password).toBe('pw');
        }
    ));

    // TODO add test for short & long lived jwt
    it('should store jwt', fakeAsync(
        inject([HttpTestingController], (controller: HttpTestingController) => {
            const service: AuthService = TestBed.get(AuthService);
            service.login('test', 'pw').subscribe(() => {
                expect(service.jwt).toBe(test_jwt);
            });
            const req = controller.expectOne(service.authenticateUrl);
            const res: AuthenticateResponse = {short: test_jwt, long: test_jwt};
            req.flush(res);
            tick(2000);
        })
    ));
    it('should store jwt in localstorage', fakeAsync(
        inject([HttpTestingController], (controller: HttpTestingController) => {
            const service: AuthService = TestBed.get(AuthService);
            service.login('test', 'pw', true).subscribe(() => {
                expect(localStorage.getItem(AuthService.LOCALSTROAGE_KEY)).toBe(
                    test_jwt
                );
                localStorage.removeItem(AuthService.LOCALSTROAGE_KEY);
            });
            const req = controller.expectOne(service.authenticateUrl);
            const res: AuthenticateResponse = {short: test_jwt, long: test_jwt};
            req.flush(res);
            tick(2000);
        })
    ));
});
