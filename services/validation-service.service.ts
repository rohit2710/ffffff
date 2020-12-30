import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  regexStore = {
    //  regexEmail:"^[a-zA-Z]{1}\w{1,}@[\w.]+\.[\w^_]+",
    regexEmail: "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}",
    regexMobile: "^[6-9]{1}[0-9]{9}[0-9]?",
    regexNames: "^[a-zA-Z]*(?:\s+[a-zA-Z][a-zA-Z]+)?$",
    regexAadhar: "^[0-9]{12}$",
    regexNoSpecialChr: "^[a-zA-Z0-9]*(?:[\s]+[a-zA-Z][a-zA-Z0-9]+)?$",
    regexPincode: "^[1-9][0-9]{5}?",
    regexOTP: "^[1-9][0-9]{5}?",
   regexFullname:"^[a-zA-Z\\s]*$",
   regexPassword:"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
  };

  patternValidator(reg: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        
        //@ts-ignore
        return null;
      }
      const regex = new RegExp(reg);
      const valid = regex.test(control.value);
      //@ts-ignore
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    //@ts-ignore
    return (formGroup: FormGroup) => {


      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    const UserList = [ 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }
}