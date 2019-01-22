import { Pipe, PipeTransform } from '@angular/core';
import { TypesService } from 'src/app/stores/type-store/types.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Pipe({
    name: 'typeName'
})
export class TypeNamePipe implements PipeTransform {
    constructor(private typeService: TypesService) {}

    transform(id: any, args?: any): any {
        if (id === undefined || id === '') {
            return of('');
        }
        return this.typeService.getType(id).pipe(map(type => type.name));
    }
}
