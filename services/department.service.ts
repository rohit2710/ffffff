import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferComplaints } from '../models/TransferComplaints';
import { Observable, throwError } from 'rxjs';
import { ComplaintDTO } from '../models/departmentComplaints';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  //List All Departments 
  getAllDepartments() {
   return this.http.get(environment.baseUrl+`/api/admin/departments`);
  }

//Transfer Complaint
  transferComplaint(transfer:TransferComplaints,complaintId:number): Observable<any> {
    return this.http.put(`http://localhost:8080/api/department/transfer/${transfer.departmentId}/${complaintId}`,transfer )
  }
  
  //Complaint List of Particular Department(TODO Passing employee Id from session)
  getComplaintByDepartmentId(employeeId:number):  Observable<any>{
    return this.http.get(`http://localhost:8080/api/department/complaints/${employeeId}`)
  }
  getComplaintByDepartmentIdPage(employeeId:number,pageNo:number,itemsPerPage:number):  Observable<any>{
    return this.http.get(`http://localhost:8080/api/department/complaints/${employeeId}/${pageNo}/${itemsPerPage}`)
  }


  //Complaint Status Updated
  statusUpdate(updateStatus:ComplaintDTO): Observable<any>{
    return this.http.put(`http://localhost:8080/api/department/status/${updateStatus.complaintId}/${updateStatus.complaintStatus}`,"")
  }
   //Complaint Status Count
  getComplaintStatusCount(status: string): Observable<any>{
    return this.http.get(`http://localhost:8080/api/department/statusCount/${status}`)
  }
  getComplaintsByDepartmentAndStatus(employeeId:number,pageNo:number,itemsPerPage:number,status: string):  Observable<any>{
    return this.http.get(`http://localhost:8080/api/department/complaintsBystatus/${employeeId}/${pageNo}/${itemsPerPage}/${status}`)
  }


}
