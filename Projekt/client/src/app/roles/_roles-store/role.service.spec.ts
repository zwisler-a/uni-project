import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from 'src/app/shared/store/store.module';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('RoleService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule, TranslateTestingModule.withTranslations({})]
        })
    );

    it('should be created', () => {
        const service: RoleService = TestBed.get(RoleService);
        expect(service).toBeTruthy();
    });
});
