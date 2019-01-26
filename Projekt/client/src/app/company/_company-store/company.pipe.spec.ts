import { CompanyPipe } from './company.pipe';
import { Subject } from 'rxjs';

describe('CompanyPipe', () => {
    it('create an instance', () => {
        const pipe = new CompanyPipe({ getCompany: () => new Subject() } as any);
        expect(pipe).toBeTruthy();
    });
});
