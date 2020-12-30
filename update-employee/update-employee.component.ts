import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/shared/models/department';
import { EmployeeDTO } from 'src/app/shared/models/employee';
import { UpdateEmployeeDTO } from 'src/app/shared/models/updateEmployee';
import { AdminService } from 'src/app/shared/services/admin.service';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { ValidationService } from 'src/app/shared/services/validation-service.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit ,OnDestroy{
  //@ts-ignore
  registerForm: FormGroup;
  submitted = false;
  departments: Department[] = [];
  employeeId: any;
  // emplist:EmployeeDTO[]=[];
  emp = new EmployeeDTO();
  departmentId: any;
  subscriptionArray:Subscription[]=[];

  // @Input()
  constructor(
    private fb: FormBuilder,
    private customValidator: ValidationService,
    private departmentService: DepartmentService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //on loading of component all departments and particular employee info will be fetched
  ngOnInit(): void {
    let subs1=this.departmentService
      .getAllDepartments()
      //@ts-ignore
      .subscribe((res: Department[]) => {
        this.departments = res;
      });
      this.subscriptionArray.push(subs1);

    this.employeeId = this.route.snapshot.paramMap.get('empId');

    let subs2=this.adminService
      .getEmployeeById(this.employeeId)
      .subscribe((res: EmployeeDTO) => {
        this.emp = res;
        this.buidForm();
      });
      this.subscriptionArray.push(subs2);
  }

  //validations
  buidForm() {
    this.registerForm = this.fb.group({
      name: [
        this.emp.name,
        Validators.compose([
          Validators.required,
          this.customValidator.patternValidator(
            this.customValidator.regexStore.regexFullname
          ),
        ]),
      ],
      email: [
        this.emp.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          this.customValidator.patternValidator(
            this.customValidator.regexStore.regexEmail
          ),
        ]),
      ],
      mobileNo: [
        this.emp.mobileNo,
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          this.customValidator.patternValidator(
            this.customValidator.regexStore.regexMobile
          ),
        ]),
      ],
      role: ['DEPARTMENT HEAD', Validators.required],
      departmentId: ['', Validators.required],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  //on submission employee info will be updated and it will be navigated employee list
  onSubmit() {
    this.submitted = true;

    let user: any = this.registerForm.value;
    let employeeDto = new UpdateEmployeeDTO();
    employeeDto = {
      email: user.email,
      mobileNo: user.mobileNo,
    };
    this.departmentId = user.departmentId;
    let subs=this.adminService
      .updateEmployee(employeeDto, this.employeeId, this.departmentId)
      .subscribe((res: boolean) => {
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
