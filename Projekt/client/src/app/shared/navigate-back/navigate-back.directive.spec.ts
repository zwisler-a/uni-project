import { NavigateBackDirective } from './navigate-back.directive';
import { ElementRef } from '@angular/core';

describe('NavigateBackDirective', () => {
    it('should create an instance', () => {
        const directive = new NavigateBackDirective(
            { back: () => {} } as any,
            { nativeElement: { addEventListener: () => {} } } as ElementRef
        );
        expect(directive).toBeTruthy();
    });
});
