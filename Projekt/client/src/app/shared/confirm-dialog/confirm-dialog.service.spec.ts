import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { ConfirmDialogService } from './confirm-dialog.service';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('ConfirmDialogService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [MatDialogModule, TranslateTestingModule.withTranslations({})],
            providers: []
        })
    );

    it('should be created', () => {
        const service: ConfirmDialogService = TestBed.get(ConfirmDialogService);
        expect(service).toBeTruthy();
    });

    it('should open emit when ok', () => {
        const service: ConfirmDialogService = TestBed.get(ConfirmDialogService);
        (service as any).dialog = {
            open: () => {
                return {
                    afterClosed: () => {
                        return new BehaviorSubject(true);
                    }
                };
            }
        };
        service.open('test').subscribe(res => {
            expect(true).toBe(true);
        });
    });

    it('should translate the given text', () => {
        const service: ConfirmDialogService = TestBed.get(ConfirmDialogService);
        (service as any).dialog = {
            open: () => {
                return {
                    afterClosed: () => {
                        return new BehaviorSubject(true);
                    }
                };
            }
        };
        service.open('test', true).subscribe(res => {
            expect(true).toBe(true);
        });
    });

    it('should open complete when not ok', () => {
        const service: ConfirmDialogService = TestBed.get(ConfirmDialogService);
        (service as any).dialog = {
            open: () => {
                return {
                    afterClosed: () => {
                        return new BehaviorSubject(false);
                    }
                };
            }
        };
        service.open('test').subscribe(
            res => {
                expect(false).toBe(true);
            },
            () => {},
            () => {
                expect(true).toBe(true);
            }
        );
    });
});
