import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss'],
})
export class ListDepartmentComponent implements OnInit,OnDestroy {
  deptId?: number;

  deptList: any[] = [];
  response: any;
  subscriptionArray:Subscription[]=[];

  constructor(private adminservice: AdminService, private router: Router) {}

  //on loading of component all departments will be loaded
  ngOnInit(): void {
    let subs=this.adminservice
      .listDepartment()
      .subscribe((data) => (this.deptList = data));
      this.subscriptionArray.push(subs);

  }

  //on click of update button it will navigate to update department component
  updateDepartment(departmentId: number) {
    this.router.navigate(['/updateDepartment', departmentId]);
  }

  //on click of delete button department will be deleted
  deleteDepartment(departmentId: number, index: number) {
    this.deptId = departmentId;

    let subs=this.adminservice.deleteDepartment(departmentId).subscribe((data) => {
      this.deptList.splice(index, 1);
    });
    this.subscriptionArray.push(subs);

  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach(d => {
      d.unsubscribe();
    })
  }
}
