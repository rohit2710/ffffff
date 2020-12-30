import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { ValidationService } from '../services/validation-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  //@ts-ignore
  registerForm: FormGroup;
  submitted = false;
  newPassword?:string;
  @Input()
  email?:string;
  constructor(private fb: FormBuilder,
    private customValidator: ValidationService,
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      otpverify: ['', Validators.compose([Validators.required, Validators.maxLength(6), this.customValidator.patternValidator(this.customValidator.regexStore.regexOTP)])],
      password: ['', Validators.compose([Validators.required])],
      confirmpassword: ['', Validators.compose([Validators.required])],
    },
    {
      validator: this.customValidator.MatchPassword('password', 'confirmpassword'),
    }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  //on submission of form password will be changed
  onSubmit() {
    this.submitted = true;
    this.newPassword = this.registerForm.value.password;
    //@ts-ignore
    this.authService.changePassword(this.email, this.newPassword).subscribe((res) =>{
            
          this.router.navigate(['/login']);
 
    },(err) => {
    
    })
  }
}
