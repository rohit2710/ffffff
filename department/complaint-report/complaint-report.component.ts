import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComplaintDTO } from 'src/app/shared/models/departmentComplaints';
import { GraphData } from 'src/app/shared/models/graphModel';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { ComplaintService } from 'src/app/shared/services/complaint.service';
import { DepartmentService } from 'src/app/shared/services/department.service';

@Component({
  selector: 'app-complaint-report',
  templateUrl: './complaint-report.component.html',
  styleUrls: ['./complaint-report.component.scss'],
})
export class ComplaintReportComponent implements OnInit, AfterViewInit ,OnDestroy{
  @ViewChild('pagination') paginator!: PaginationComponent;  
  complaints:ComplaintDTO[]=[];
  // searchKey:string='';
  itemsPerPage=2;
  totalItemsForPage!:number;
  complaintCountByStatus!:GraphData;
  isForAllStatus:boolean=true;
  fileBaseUrl: string = 'http://localhost:8080/api/download/';
  subscriptionArray:Subscription[]=[];



  //for pagination
  pageComplaintStatus!: string;
  pageNumber: number = 0;
  //@ts-ignore
  employeeId: number = sessionStorage.getItem('userId');

  constructor(
    private departmentService: DepartmentService,
    private complaintService: ComplaintService
  ) {}

  ngAfterViewInit(): void {
    if (this.paginator != undefined) {
      this.paginator.loadPaginater();
    }
  }

  //on loading it will fetch all complaints of department
  ngOnInit(): void {
    //@ts-ignore
    let subs=this.complaintService.getDataByDepartmentId(this.employeeId)
      .subscribe((res) => {
        //@ts-ignore
        this.complaintCountByStatus = res;
        this.totalItemsForPage = this.complaintCountByStatus.totalComplaint;
        this.getAllDeptComplaints();
      });
      this.subscriptionArray.push(subs);
  }

  //it will fetch complaints according to complaint status
  getComplaintsByStatus(status: string, totalitems?: number) {
    this.isForAllStatus = false;
    this.pageComplaintStatus = status;
    this.totalItemsForPage = totalitems ? totalitems : this.totalItemsForPage;
    if(totalitems == 0){
      this.totalItemsForPage=0;
    }
    if (this.paginator == undefined) {
      this.pageNumber = 0;
    } else {
      this.pageNumber = this.paginator.currentPage;
    }
    let subs=this.departmentService
      .getComplaintsByDepartmentAndStatus(
        this.employeeId,
        this.pageNumber,
        this.itemsPerPage,
        this.pageComplaintStatus
      )
      .subscribe((res: ComplaintDTO[]) => {
        this.complaints = res;
        //@ts-ignore
        this.totalItemsForPage = totalitems ? totalitems : this.totalItemsForPage;
        if (this.paginator != undefined) {
          this.paginator.loadPaginater();
        }
      });
      this.subscriptionArray.push(subs);
  }

  getComplaintDataForPagination() {
    // this.paginator.paginationArray=[];
    this.pageNumber = this.paginator.currentPage;
    if (this.isForAllStatus) {
      this.getAllDeptComplaints();
    } else {
      this.getComplaintsByStatus(this.pageComplaintStatus);
    }
  }

  //For Pagination
  getAllDeptComplaints() {
    this.isForAllStatus = true;
    if (this.paginator == undefined) {
      this.pageNumber = 0;
      // this.itemsPerPage=2;
    } else {
      this.pageNumber = this.paginator.currentPage;
    }
    let subs=this.departmentService
      .getComplaintByDepartmentIdPage(
        this.employeeId,
        this.pageNumber,
        this.itemsPerPage
      )
      .subscribe((res: ComplaintDTO[]) => {
        this.complaints = res;
        this.totalItemsForPage = this.complaintCountByStatus.totalComplaint;
        if (this.paginator != undefined) {
          this.paginator.loadPaginater();
        }
      });
      this.subscriptionArray.push(subs);
  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach(d => {
      d.unsubscribe();
    })
  }
}
