import { AbstractControl } from '@angular/forms';

export const CustomValidators = {
    isColor: function(control: AbstractControl): { [key: string]: any } | null {
        const isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(control.value);
        return isOk ? null : { 'not-a-color': true };
    }
};
