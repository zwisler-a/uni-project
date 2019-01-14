import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFieldComponent } from './type-field.component';
import { TypesModule } from '../types.module';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('TypeFieldComponent', () => {
    let component: TypeFieldComponent;
    let fixture: ComponentFixture<TypeFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TypesModule, TranslateTestingModule.withTranslations({})]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypeFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
