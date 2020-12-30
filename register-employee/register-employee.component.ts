import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Department } from 'src/app/shared/models/department';
import { EmployeeRegistrationDTO } from 'src/app/shared/models/employeeRegistration';
import { AdminService } from 'src/app/shared/services/admin.service';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { ValidationService } from 'src/app/shared/services/validation-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss'],
})
export class RegisterEmployeeComponent implements OnInit,OnDestroy {
  //@ts-ignore
  registerForm: FormGroup;
  submitted = false;
  departments!: Department[];
  subscriptionArray:Subscription[]=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customValidator: ValidationService,
    private departmentService: DepartmentService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  //on loading of component all departments will be loaded
  ngOnInit(): void {
    this.buidForm();
    this.departmentService
      .getAllDepartments()
      //@ts-ignore
      .subscribe((res: Department[]) => {
        this.departments = res;
      });
  }

  //validations for fields
  buidForm() {
    this.registerForm = this.fb.group(
      {
        fname: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(
              this.customValidator.regexStore.regexNames
            ),
          ]),
        ],
        lname: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(
              this.customValidator.regexStore.regexNames
            ),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            this.customValidator.patternValidator(
              this.customValidator.regexStore.regexEmail
            ),
          ]),
        ],
        password: ['', Validators.compose([Validators.required,Validators.minLength(8)])],
        confirmpassword: ['', Validators.compose([Validators.required])],
        mobileNo: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(10),
            this.customValidator.patternValidator(
              this.customValidator.regexStore.regexMobile
            ),
          ]),
        ],
        role: ['DEPARTMENT HEAD', Validators.required],
        departmentId: ['', Validators.compose([Validators.required])],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmpassword'
        ),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  //on submition employee will be registered
  onSubmit() {
    this.submitted = true;

    let user: any = this.registerForm.value;

    let employeeRegistrationDto = new EmployeeRegistrationDTO();

    employeeRegistrationDto = {
      name: user.fname + ' ' + user.lname,
      email: user.email,
      password: user.password,
      role: user.role,
      mobileNo: user.mobileNo,
      departmentId: user.departmentId,
    };

    let subs=this.adminService
      .registerEmployee(employeeRegistrationDto)
      .subscribe((res) => {
        this.toastr.success(`Employee registred successfully`);
        this.router.navigate(['employeeList']);
      });
      this.subscriptionArray.push(subs);
  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach(d => {
      d.unsubscribe();
    })
  }
}
