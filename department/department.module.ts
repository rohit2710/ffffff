import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComplaintComponent } from './transfer-complaint/transfer-complaint.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { ComplaintReportComponent } from './complaint-report/complaint-report.component';
import { SharedModule } from '../shared/shared.module';
import { ComplaintDetailsComponent } from './complaint-details/complaint-details.component';



@NgModule({
  declarations: [TransferComplaintComponent,ComplaintListComponent, ComplaintReportComponent, ComplaintDetailsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ],
  exports:[TransferComplaintComponent,ComplaintListComponent,ComplaintReportComponent,ComplaintDetailsComponent]
})
export class DepartmentModule { }
