import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypeComponent } from './select-type.component';
import { TypesModule } from '../types.module';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('SelectTypeComponent', () => {
    let component: SelectTypeComponent;
    let fixture: ComponentFixture<SelectTypeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TypesModule, TranslateTestingModule.withTranslations({})]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
