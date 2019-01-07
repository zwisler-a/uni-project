import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material';
import { Resolve, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterLoadingIndicatorComponent } from './router-loading-indicator.component';

class DelayResolve implements Resolve<any> {
    resolve() {
        return new Promise(res => {
            setTimeout(res, 5000);
        });
    }
}

const testRoutes: Routes = [
    { path: '', children: [] },
    { path: '1', children: [] },
    {
        path: '2',
        children: [],
        resolve: {
            delay: DelayResolve
        }
    }
];

describe('RouterLoadingIndicatorComponent', () => {
    let component: RouterLoadingIndicatorComponent;
    let fixture: ComponentFixture<RouterLoadingIndicatorComponent>;
    let router: Router;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RouterLoadingIndicatorComponent],
            imports: [
                MatProgressBarModule,
                RouterTestingModule.withRoutes(testRoutes)
            ],
            providers: [DelayResolve]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RouterLoadingIndicatorComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a empty progressbar after navigation', fakeAsync(() => {
        fixture.ngZone.run(() => {
            router.navigateByUrl('/1');
        });
        tick(5000);
        expect(component.loadingProgress).toBe(0);
    }));

    it('should be hidden if not navigating', fakeAsync(() => {
        expect(component.hide).toBeTruthy();
        fixture.ngZone.run(() => {
            router.navigateByUrl('/1');
        });
        tick(5000);
        expect(component.hide).toBeTruthy();
    }));

    it('should have loading steps', fakeAsync(() => {
        fixture.ngZone.run(() => {
            router.navigateByUrl('/2');
        });
        expect(component.loadingProgress).toBe(0);
        tick();
        expect(component.loadingProgress).toBe(60);
        tick(6000);
        expect(component.loadingProgress).toBe(0);
    }));
});
