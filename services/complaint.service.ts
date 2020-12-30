import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SendMessage } from '../models/chat';
import { GraphData } from '../models/graphModel';
import { CommentMessage } from '../models/publicPost';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http:HttpClient) { }
  // POST /api/uploadFile
  
 complaintSubject = new BehaviorSubject(null);


  uploadImage(image:any){
   return this.http.post("http://localhost:8080/api/upload",image,{
     reportProgress:true,
     observe:'events'
   });   
  }

  downloadFile(documentPath:string){
    return this.http.get('http://localhost:8080/api/download/'+documentPath,{responseType: 'blob'})
  }

  getCitizenById(){
    return this.http.get("http://localhost:8080/app/test/getCitizenById/1");
  } 

  getComplaintsById(complaintId:any){
    return this.http.get(`http://localhost:8080/app/test/getComplaintById/${complaintId}`);
  }

  getComplaintDetals(feedbackPostId:string){
    return this.http.get(`http://localhost:8080/app/test/loadpost/${feedbackPostId}`);
  }

  //Like Dislike Commets
  likePost(feedbackPostId:string,userId:number){
    return this.http.post('http://localhost:8080/app/test/like/'+feedbackPostId+'/'+userId,null);
  }

  disLikePost(feedbackPostId:string,userId:number){
    return this.http.post('http://localhost:8080/app/test/dislike/'+feedbackPostId+'/'+userId,null);
  }

  addComment(feedbackPostId:string,commetMessage:CommentMessage){
   return this.http.post('http://localhost:8080/app/test/addCommets/'+feedbackPostId,commetMessage);
  }

  ///chatting
  getAllMessages(chatId:string){
    return this.http.get('http://localhost:8080/app/test/getchat/'+chatId);
  }
  sendMessage(chatId:string,message:SendMessage){
    return this.http.post('http://localhost:8080/app/test/addmessage/'+chatId,message);
  }
  
  getComplaintDetal(feedbackPostId:string){
    return this.http.get(`http://localhost:8080/app/test/post/${feedbackPostId}`);
  }
  
  getAllGraphData(){
   return this.http.get(`http://localhost:8080/api/admin/getAllGraphData`);
  }

  getAllGraphDataByDepartmentId(departmentId:string){
    return this.http.get(`http://localhost:8080/api/admin/getGraphDataByDepartment/${departmentId}`);
   }

  getDataByDepartmentId(departmentId:string){
    return this.http.get(`http://localhost:8080/api/department/getDataByDeptId/${departmentId}`);
   }
}
