import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentRegistrationComponent } from './department-registration/department-registration.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReportComponent } from './report/report.component';
import { SharedModule } from '../shared/shared.module';
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import { AdminComplaintListComponent } from './admin-complaint-list/admin-complaint-list.component';
import { AdminTransferComplaintComponent } from './admin-transfer-complaint/admin-transfer-complaint.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LockedAccountComponent } from './locked-account/locked-account.component';




@NgModule({

  declarations: [RegisterEmployeeComponent, DepartmentRegistrationComponent, EmployeeListComponent,
                 UpdateEmployeeComponent,UpdateDepartmentComponent,ListDepartmentComponent, ReportComponent, ComplaintListComponent, AdminComplaintListComponent, AdminTransferComplaintComponent, LockedAccountComponent,AdminDashboardComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    SharedModule
  ],
  exports: [AdminDashboardComponent]

})
export class AdminModule { }
