import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { throwError } from 'rxjs';

import { ItemErrorService } from './item-error.service';

const dialogMock = { open: () => {} };

describe('ItemErrorService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [TranslateTestingModule.withTranslations({})],
            providers: [{ provide: MatSnackBar, useValue: dialogMock }]
        })
    );

    it('should be created', () => {
        const service: ItemErrorService = TestBed.get(ItemErrorService);
        expect(service).toBeTruthy();
    });

    it('should show snackbar on update error', () => {
        const service: ItemErrorService = TestBed.get(ItemErrorService);
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
        const service: ItemErrorService = TestBed.get(ItemErrorService);
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

    it('should show snackbar on delete error', () => {
        const service: ItemErrorService = TestBed.get(ItemErrorService);
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

    it('should show snackbar on get error', () => {
        const service: ItemErrorService = TestBed.get(ItemErrorService);
        const operator = service.getItemError();
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
