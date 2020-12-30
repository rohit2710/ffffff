import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ComplaintDTO } from 'src/app/shared/models/departmentComplaints';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { tap, map } from 'rxjs/operators';
import { ComplaintService } from 'src/app/shared/services/complaint.service';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss'],
})
export class ComplaintListComponent implements OnInit, AfterViewInit ,OnDestroy{
  @ViewChild('pagination') paginator!: PaginationComponent;
  //@ts-ignore
  registerForm: FormGroup;
  complaints: any = [];
  chatId!: string;
  fileBaseUrl: string = 'http://localhost:8080/api/download/';
  subscriptionArray:Subscription[]=[];

  //@ts-ignore
  @ViewChild('chatWindow') chatWindow!: ChatWindowComponent;

  //@ts-ignore
  employeeId: number = sessionStorage.getItem('userId');

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private complaintService: ComplaintService
  ) {}

  ngAfterViewInit(): void {
    this.getAllDeptComplaintsList();
  }

  ngOnInit(): void {}

  //this method will fetch all complaints of particular department with pagination
  getAllDeptComplaintsList() {
    let pageno = 0;
    let itemsPerPage = 2;
    if (this.paginator == undefined) {
      pageno = 0;
      itemsPerPage = 2;
    } else {
      pageno = this.paginator.currentPage;
    }

    let subs=this.departmentService
      .getComplaintByDepartmentIdPage(this.employeeId, pageno, itemsPerPage)
      .pipe(
        tap((data) => console.log(data)),
        map((dataList) =>
          dataList.filter(
            (data: { complaintStatus: string }) =>
              data.complaintStatus != 'RESOLVED'
          )
        )
      )
      .subscribe((data) => {
        this.complaints = data;
      });
      this.subscriptionArray.push(subs);

  }

  //it will navigate to transfer complaint component
  transferComplaint(complaintId: any) {
    this.router.navigate(['/transferComplaint', complaintId]);
  }

  //update status for complaint
  updateStatus(Id: any, index: any, status: string) {
    this.complaints[index].complaintStatus = status;
    let updateStatus = new ComplaintDTO();
    updateStatus = {
      complaintStatus: status,
      complaintId: Id,
    };

    if(status == "RESOLVED")
        this.complaints.splice(index,1);

        let subs=this.departmentService
      .statusUpdate(updateStatus)
      .subscribe((res: ComplaintDTO) => {
        
      });
      this.subscriptionArray.push(subs);

  }

  //it will navigate complaintdetails component
  showMore(complaintObj: any) {
    this.complaintService.complaintSubject.next(complaintObj);
    this.router.navigate(['/complaintDetails']);
  }

  //it will open modal for remarks 
  showRemark(chatId: any) {
    this.chatId = chatId;
    this.chatWindow.openModel();
  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach(d => {
      d.unsubscribe();
    })
  }
}
