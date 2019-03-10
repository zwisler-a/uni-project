import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TypesService } from 'src/app/types/_type-store/types.service';

@Pipe({
    name: 'typeName'
})
export class TypeNamePipe implements PipeTransform {
    constructor(private typeService: TypesService) {}

    transform(id: any, args?: any): any {
        if (id === undefined || id === '' || id <= 0) {
            return of('');
        }
        return this.typeService.getType(id).pipe(map(type => type.name));
    }
}
