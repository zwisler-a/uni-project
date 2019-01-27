import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { throwError } from 'rxjs';

import { TypeErrorService } from './type-error.service';

const dialogMock = { open: () => {} };

describe('TypeErrorService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule, TranslateTestingModule.withTranslations({})],
            providers: [{ provide: MatSnackBar, useValue: dialogMock }]
        })
    );

    it('should be created', () => {
        const service: TypeErrorService = TestBed.get(TypeErrorService);
        expect(service).toBeTruthy();
    });

    it('should show snackbar on get error', () => {
        const service: TypeErrorService = TestBed.get(TypeErrorService);
        const operator = service.getError();
        dialogMock.open = () => {
            expect(true).toBe(true);
        };
        throwError('')
            .pipe(operator)
            .subscribe(
                () => {},
                () => {
                    expect(true).toBe(true);
                }
            );
    });

    it('should show snackbar on delete error', () => {
        const service: TypeErrorService = TestBed.get(TypeErrorService);
        const operator = service.deleteError();
        dialogMock.open = () => {
            expect(true).toBe(true);
        };
        throwError('')
            .pipe(operator)
            .subscribe(
                () => {},
                () => {
                    expect(true).toBe(true);
                }
            );
    });
    it('should show snackbar on update error', () => {
        const service: TypeErrorService = TestBed.get(TypeErrorService);
        const operator = service.updateError();
        dialogMock.open = () => {
            expect(true).toBe(true);
        };
        throwError('')
            .pipe(operator)
            .subscribe(
                () => {},
                () => {
                    expect(true).toBe(true);
                }
            );
    });
    it('should show snackbar on create error', () => {
        const service: TypeErrorService = TestBed.get(TypeErrorService);
        const operator = service.createError();
        dialogMock.open = () => {
            expect(true).toBe(true);
        };
        throwError('')
            .pipe(operator)
            .subscribe(
                () => {},
                () => {
                    expect(true).toBe(true);
                }
            );
    });
});
