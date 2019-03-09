import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatIconModule, MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { NavigationGroupComponent } from './navigation-group.component';
import { Router } from '@angular/router';
import { PermissionModule } from 'src/app/permission/permission.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavigationGroupComponent', () => {
    let component: NavigationGroupComponent;
    let fixture: ComponentFixture<NavigationGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationGroupComponent],
            imports: [
                MatListModule,
                MatIconModule,
                PermissionModule.forRoot(),
                HttpClientTestingModule,
                TranslateTestingModule.withTranslations({}),
                RouterTestingModule.withRoutes([{ path: '1', children: [] }])
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a "a" element', () => {
        component.group = {
            title: 'title',
            items: [{ icon: '', label: '', route: ['/1'] }]
        };
        fixture.detectChanges();
        const link = fixture.nativeElement.querySelector('a');
        expect(link).toBeTruthy();
    });

    it('should navigate on click', fakeAsync(() => {
        component.group = {
            title: 'title',
            items: [{ icon: '', label: '', route: ['/1'] }]
        };
        fixture.detectChanges();
        const link = fixture.nativeElement.querySelector('a');
        link.click();
        tick(1000);
        const router: Router = TestBed.get(Router);
        expect(router.url).toContain('/1');
    }));
});
