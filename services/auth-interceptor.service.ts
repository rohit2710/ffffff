import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    //httpinterceptor will modify every http request
  //modification logic will go to intercept  
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(sessionStorage.getItem('token') && sessionStorage.getItem('email')){
      req = req.clone({
        setHeaders:{
          Authorization: ""+sessionStorage.getItem('token')
        }
      })
    }
    return next.handle(req)
  }
}
