import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTypeSelectComponent } from './field-type-select.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MatMenuModule, MatIconModule, MatTooltipModule } from '@angular/material';

describe('FieldTypeSelectComponent', () => {
    let component: FieldTypeSelectComponent;
    let fixture: ComponentFixture<FieldTypeSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FieldTypeSelectComponent],
            imports: [TranslateTestingModule.withTranslations({}), MatMenuModule, MatIconModule, MatTooltipModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FieldTypeSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
