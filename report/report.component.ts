import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Department } from 'src/app/shared/models/department';
import { ComplaintDTO } from 'src/app/shared/models/citizencomplaint';
import { AdminService } from 'src/app/shared/services/admin.service';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, AfterViewInit ,OnDestroy{
  @ViewChild('pagination') paginator!: PaginationComponent;

  adminComplaints:ComplaintDTO[]=[];
  departments:Department[]=[];
  searchKey:string='';
  msg:string='';
  totalItemsForPage:number=0;
  itemsPerPage:number=0;
  fileBaseUrl: string = 'http://localhost:8080/api/download/';
  subscriptionArray:Subscription[]=[];

  constructor(
    private adminService: AdminService,
    private departmentService: DepartmentService
  ) {}

  //it will fetch complaints using department name
  searchDept(key: string) {
    let subs=this.adminService.getComplaintByDepartmentName(key).subscribe(
      (res: ComplaintDTO[]) => {
        if (res == undefined || res.length == 0) {
          this.msg = 'There are no complaints';
        }
        this.adminComplaints = res;
      },
      (error) => {}
    );
    this.subscriptionArray.push(subs);
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.getAllComplaints();
    this.getAllDepartments();
  }

//it will load all the complaints
  getAllComplaints(){
    let pageno=0;
    let itemsPerPage=10;
    if(this.paginator == undefined)
    {
      pageno = 0;
      // itemsPerPage=2;
    }else{
      pageno=this.paginator.currentPage
    }

    let subs=this.adminService.listComplaints(pageno, itemsPerPage).subscribe(
      (res: ComplaintDTO[]) => {
        this.adminComplaints = res;
      },
      (error) => {
        //stay on same page
      }
    );
    this.subscriptionArray.push(subs);
  }
  getComplaintDataForPagination(){

  }

  getAllDepartments() {
    let subs=this.departmentService
      .getAllDepartments()
      //@ts-ignore
      .subscribe((res: Department[]) => {
        this.departments = res;
      });
      this.subscriptionArray.push(subs);
  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach(d => {
      d.unsubscribe();
    })
  }
}
