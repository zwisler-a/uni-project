import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectorComponent } from './language-selector.component';
import { MatMenuModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('LanguageSelectorComponent', () => {
    let component: LanguageSelectorComponent;
    let fixture: ComponentFixture<LanguageSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LanguageSelectorComponent],
            imports: [MatMenuModule, NoopAnimationsModule, TranslateTestingModule.withTranslations({})]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LanguageSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
/*
    it('should create', () => {
        expect(component).toBeTruthy();
    });*/
});
