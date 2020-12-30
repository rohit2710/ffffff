import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentRegistrationComponent } from './admin/department-registration/department-registration.component';
import { EmployeeListComponent } from './admin/employee-list/employee-list.component';
import { RegisterEmployeeComponent } from './admin/register-employee/register-employee.component';
import { UpdateEmployeeComponent } from './admin/update-employee/update-employee.component';
import { CitizenComplaintsComponent } from './citizen/citizen-complaints/citizen-complaints.component';
import { CitizenRegistrationComponent } from './citizen/citizen-registration/citizen-registration.component';
import { ComplaintRegistrationComponent } from './citizen/complaint-registration/complaint-registration.component';
import { PublicComplaintListComponent } from './citizen/public-complaint-list/public-complaint-list.component';
import { PublicComplaintComponent } from './citizen/public-complaint/public-complaint.component';
import { ComplaintListComponent } from './department/complaint-list/complaint-list.component';
import { TransferComplaintComponent } from './department/transfer-complaint/transfer-complaint.component';
import { UpdateDepartmentComponent } from './admin/update-department/update-department.component';
import { ListDepartmentComponent } from './admin/list-department/list-department.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ComplaintReportComponent } from './department/complaint-report/complaint-report.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { ComplaintDetailsComponent } from './department/complaint-details/complaint-details.component';
import { ReportComponent } from './admin/report/report.component';
import { ChatWindowComponent } from './shared/chat-window/chat-window.component';
import { LoginComponent } from './shared/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuardGuard } from './shared/services/auth-guard.guard';
import { AdminComplaintListComponent } from './admin/admin-complaint-list/admin-complaint-list.component';
import { AdminTransferComplaintComponent } from './admin/admin-transfer-complaint/admin-transfer-complaint.component';
import { OTPGenerationComponent } from './shared/otpgeneration/otpgeneration.component';
import { OTPVerificationComponent } from './shared/otpverification/otpverification.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AccountActivatioonComponent } from './citizen/account-activatioon/account-activatioon.component';
import { LockedAccountComponent } from './admin/locked-account/locked-account.component';


// sets up routes constant where you define your routes
const routes: Routes = [
  {
    path: 'registerDepartment',
    component: DepartmentRegistrationComponent
  },

  {
    path: 'registerEmployee',
    component: RegisterEmployeeComponent
  },
  {
    path: 'registerCitizen',
    component: CitizenRegistrationComponent
  },
  {
    path: 'registerComplaint',
    component: ComplaintRegistrationComponent
  },
  {
    path: 'transferComplaint/:complaintId',
    component: TransferComplaintComponent
  },
  {
    path: 'updateDepartment/:departmentId',
    component: UpdateDepartmentComponent
  },
  {
    path: 'listDepartment',
    component: ListDepartmentComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: 'publicComplaint/:complaintId/:userId',
    component: PublicComplaintComponent

  },
  {
    path: 'departmentComplaints',
    canActivate: [AuthGuardGuard],
    data: { role: 'DEPARTMENTHEAD' },
    component: ComplaintListComponent
  },
  {
    path: 'citizenComplaints',
    component: CitizenComplaintsComponent
  },
  {
    path: 'employeeList',
    component: EmployeeListComponent
  },
  {
    path: 'updateEmployee/:empId',
    component: UpdateEmployeeComponent
  },
  {
    path: "citizenhome",
    canActivate: [AuthGuardGuard],
    data: { role: 'CITIZEN' },
    component: PublicComplaintListComponent,
  },
  {
    path: "departmentReport",
    canActivate: [AuthGuardGuard],
    data: { role: 'DEPARTMENTHEAD' },
    component: ComplaintReportComponent,
  },
  {
    path: "changepassword",
    component: ChangePasswordComponent
  },
  {
    path: "complaintDetails",
    component: ComplaintDetailsComponent
  },
  {
    path: "adminReport",
    component: ReportComponent
  },
  {
    path: 'chat',
    component: ChatWindowComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "complaints",
    component: AdminComplaintListComponent
  },
  {
    path: 'admintransfercomplaint/:complaintId',
    component: AdminTransferComplaintComponent
  },
  {
    path: 'otpgeneration',
    component: OTPGenerationComponent
  }, {
    path: 'otpverification/:email',
    component: OTPVerificationComponent
  },
  {
    path:"admin-dash",
    component:AdminDashboardComponent
  },
  {
    path:'otpgeneration',
    component:OTPGenerationComponent
  },
  {
    path:'otpverification/:email',
    component:OTPVerificationComponent
  },
  {
    path:'activateAccount/:email',
    component:AccountActivatioonComponent
  },
  {
    path:'lockedaccount',
    component:LockedAccountComponent
  }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
