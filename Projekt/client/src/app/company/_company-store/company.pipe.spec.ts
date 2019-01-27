import { CompanyPipe } from './company.pipe';
import { Subject, BehaviorSubject } from 'rxjs';

describe('CompanyPipe', () => {
    it('create an instance', () => {
        const pipe = new CompanyPipe({ getCompany: () => new Subject() } as any);
        expect(pipe).toBeTruthy();
    });

    it('should handle empty input', () => {
        const pipe = new CompanyPipe({ getCompany: () => new Subject() } as any);
        expect(pipe).toBeTruthy();

        pipe.transform('').subscribe(res => {
            expect(res).toBe('');
        });

        pipe.transform(undefined).subscribe(res => {
            expect(res).toBe('');
        });

        pipe.transform(0).subscribe(res => {
            expect(res).toBe('');
        });
    });

    it('should request a company', () => {
        const pipe = new CompanyPipe({
            getCompany: () => {
                expect(true).toBe(true);
                const ret = new BehaviorSubject({ name: 'asd' });
                return ret.asObservable();
            }
        } as any);
        expect(pipe).toBeTruthy();

        pipe.transform(5).subscribe((res: any) => {
            expect(res).toBe('asd');
        });
    });
});
