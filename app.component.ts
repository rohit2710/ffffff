import { Component,OnChanges,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {

  //@ts-ignore
  userrole?:string; 


  constructor(private authService:AuthService, private router: Router){}
  ngOnInit(): void {
   this.authService.changeNav()

  }

  ngOnChanges(){
    //@ts-ignore
    this.userrole = sessionStorage.getItem('userrole');
  }
  
}
