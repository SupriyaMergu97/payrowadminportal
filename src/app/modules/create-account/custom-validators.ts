import { ValidationErrors, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        // return (group: FormGroup) => {
        //     if (group.controls[PW].value !== group.controls[cnfPW].value) {
        //       group.controls[cnfPW].setErrors({ checkPassword: true });
        //     } else { group.controls[cnfPW].setErrors(null); }

        //   }
        return (control: AbstractControl) => {
            if (!control.value) {
                return error;
            }
            const valid = regex.test(control.value);
            return valid ? null : error;
        };
    }

    static passwordMatchValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.passwordMatchValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ passwordMatchValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}
