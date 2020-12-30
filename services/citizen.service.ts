import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComplaintRegisterDTO } from '../models/complaintRegistration';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {

  constructor(private http:HttpClient) { }
 // POST /api/registercomplaint/{citizenId}
  registerComplaint(userId:number, complaintRegistrationDto:ComplaintRegisterDTO){
    return this.http.post(`http://localhost:8080/api/citizen/complaint/${userId}`,complaintRegistrationDto);
   }

  //getAllcitizenAddresses
  //GET /api/citizen/{citizenId}/address
  getAllCitizenAddress(citizenId:number){
    return this.http.get(`http://localhost:8080/api/citizen/citizen/${citizenId}/addresses`)
  } 

  //list of complaints using citizenId
  getAllComplaintsById(citizenId:number) {
   return this.http.get(`http://localhost:8080/api/citizen/complaints/${citizenId}`);
  }
  sendReminder(complaintId:number){
    return this.http.put(`http://localhost:8080/api/citizen/reminder/${complaintId}`,null);
  }

  //get all complaints 
  getAllComplaint(): Observable<any>{
    return this.http.get(`http://localhost:8080/api/citizen/complaints`)
  }
}
