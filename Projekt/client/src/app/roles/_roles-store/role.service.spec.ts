import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from 'src/app/shared/store/store.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from 'src/app/shell/auth/auth.module';

describe('RoleService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule,
                AuthModule,
                TranslateTestingModule.withTranslations({}),
                RouterTestingModule.withRoutes([])
            ]
        })
    );

    it('should be created', () => {
        const service: RoleService = TestBed.get(RoleService);
        expect(service).toBeTruthy();
    });
});
