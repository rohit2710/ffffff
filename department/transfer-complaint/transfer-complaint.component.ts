import { compileFactoryFunction } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/shared/models/department';
import { TransferComplaints } from 'src/app/shared/models/TransferComplaints';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { ValidationService } from 'src/app/shared/services/validation-service.service';

@Component({
  selector: 'app-transfer-complaint',
  templateUrl: './transfer-complaint.component.html',
  styleUrls: ['./transfer-complaint.component.scss'],
})
export class TransferComplaintComponent implements OnInit ,OnDestroy{
  //@ts-ignore
  registerForm: FormGroup;
  submitted = false;
  complaintId: any;
  departments: Department[] = [];
  subscriptionArray:Subscription[]=[];


  constructor(
    private fb: FormBuilder,
    private customValidator: ValidationService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      departmentId: ['', Validators.compose([Validators.required])],
    });
    this.complaintId = this.route.snapshot.paramMap.get('complaintId');

    this.getAllDepartments();
  }

  //it will fetch all departments
  getAllDepartments() {
    //@ts-ignore
    let subs=this.departmentService.getAllDepartments().subscribe((res: Department[]) => {
        this.departments = res;
      });
      this.subscriptionArray.push(subs);
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  //on submission complaint will be transferred to particular department and it will navigate to dashboard
  onSubmit() {
    this.submitted = true;

    let transferComplaint: any = this.registerForm.value;

    let transfer = new TransferComplaints();
    transfer = {
      complaintId: this.complaintId,
      departmentId: transferComplaint.departmentId,
    };
    let subs=this.departmentService
      .transferComplaint(transfer, this.complaintId)
      .subscribe((res) => console.log(res));
      this.subscriptionArray.push(subs);
    this.router.navigate(['/departmentComplaints']);
  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach(d => {
      d.unsubscribe();
    })
  }
}
