import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {EmployeeRegistrationDTO } from '../models/employeeRegistration';
import { Department } from '../models/department';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../models/employee';
import { UpdateEmployeeDTO } from '../models/updateEmployee';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit {
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    
  }
  //POST /api/admin/registeremployee
  registerEmployee(employeeRegistrationDto:EmployeeRegistrationDTO){
    return this.http.post(`http://localhost:8080/api/admin/employee`,employeeRegistrationDto);
   }
    //POST /api/admin/registerdepartment
   registerDepartment(departmentRegistration:Department){
    return this.http.post(`http://localhost:8080/api/admin/department`,departmentRegistration);
   }

   //update department
   updatedDepartment(updatedDepartment:Department,departmentId:number): Observable<any>{
     return this.http.put(`http://localhost:8080/api/admin/department/${departmentId}`,updatedDepartment);
   }

   //list of all complaints
   listComplaints(pageNo:number,itemsPerPage:number): Observable<any>{
    return this.http.get(`http://localhost:8080/api/admin/complaints/${pageNo}/${itemsPerPage}`);
   }

   //list of all departments
   listDepartment(): Observable<any>{
    return this.http.get(`http://localhost:8080/api/admin/departments`);
  }
  
  //delete department
  deleteDepartment(departmentId:number): Observable<any>{
    return this.http.delete(`http://localhost:8080/api/admin/department/${departmentId}`);
  }

  //get department info using departmentId
  getCurrentDepartment(departmentId: number): Observable<any>{
    return this.http.get(`http://localhost:8080/api/admin/department/${departmentId}`);
  }
  
  //list of all employees
  getAllEmployee():Observable<any>{
    return this.http.get(`http://localhost:8080/api/admin/employees`);
  }

  //get employee info using employeeId
  getEmployeeById(employeeId:EmployeeDTO): Observable<any>{
    return this.http.get(`http://localhost:8080/api/admin/employee/${employeeId}`)
  }

  //update employee
  updateEmployee(updateEmployeeDto:UpdateEmployeeDTO,employeeId:number,departmentId:number): Observable<any>{
    return this.http.put(`http://localhost:8080/api/admin/employee/${employeeId}/${departmentId}`,updateEmployeeDto)
  }

  //list of complaints which don't have any department 
  getAllComplaintWithNoDepartment():Observable<any>{
    return this.http.get(`http://localhost:8080/api/admin/floatingcomplaints`);
  }

  //list of all locked accounts
  getAllLockedUser(){
    return this.http.get(`http://localhost:8080/api/admin/lockedaccount`);
  }

  //will activate account 
  activateAccount(email:string){
    return this.http.put(`http://localhost:8080/api/admin/active/${email}`,"");
  }
   

  //All complaints of particular department
  getComplaintByDepartmentName(departmentName:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/admin/complaints/${departmentName}`)
  }
}
