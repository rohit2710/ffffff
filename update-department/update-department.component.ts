import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation-service.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Department } from 'src/app/shared/models/department';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss'],
})
export class UpdateDepartmentComponent implements OnInit,OnDestroy {
  //@ts-ignore

  submitted = false;
  departmentId!: number;
  subscriptionArray:Subscription[]=[];

  registerForm = new FormGroup({
    departmentName: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private customValidator: ValidationService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  //validations and on loading of component all departments will be fetched
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      departmentName: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.patternValidator(
            this.customValidator.regexStore.regexNames
          ),
        ]),
      ],
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          this.customValidator.patternValidator(
            this.customValidator.regexStore.regexNoSpecialChr
          ),
        ]),
      ],
    });

    this.departmentId = this.activatedRoute.snapshot.params.departmentId;

    let subs=this.adminService
      .getCurrentDepartment(this.departmentId)
      .subscribe((result) => {
        this.registerForm = new FormGroup({
          departmentName: new FormControl(result['departmentName']),
          description: new FormControl(result['description']),
        });
      });
      this.subscriptionArray.push(subs);
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  //on submission of update form department's info will be updated (like department name, description)
  onSubmit() {
    this.submitted = true;

    let updatedDepartment: any = this.registerForm.value;
    let department = new Department();
    (department.departmentName = updatedDepartment.departmentName),
      (department.description = updatedDepartment.description);
    let subs=this.adminService
      .updatedDepartment(department, this.departmentId)
      .subscribe((res) => {
        this.router.navigate(['listDepartment']);
      });
      this.subscriptionArray.push(subs);
  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach(d => {
      d.unsubscribe();
    })
  }
}
