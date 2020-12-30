import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CitizenRegistration } from '../models/citizenRegistration';
import { Resetpassword } from '../models/resetpassword';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NabarMenu, UserRole } from '../models/navbarMenu';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userRole:string|undefined|null;
  navBars:NavBars=new NavBars();
  loginStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  username = new BehaviorSubject<string | null>(sessionStorage.getItem('email'));
  userrole = new BehaviorSubject<string | null>(sessionStorage.getItem('userrole'));
  navbarMenuSubject = new BehaviorSubject<NabarMenu>(this.navBars.commonMenu);
 
  nameSubject=new BehaviorSubject<string|null>("");


  constructor(private http: HttpClient,
    private router:Router,
    private toastr:ToastrService) { }

  registerCitizen(citizenRegistration: CitizenRegistration) {
    return this.http.post("http://localhost:8080/api/auth/register", citizenRegistration);
  }

  getCitizenById() {
    this.http.get("http://localhost:8080/getCitizenById/1").subscribe(c => {
      sessionStorage.setItem("citizen", JSON.stringify(c));
    })
  }

  //change password
  resetPassword(resetPassword: Resetpassword) {
    return this.http.put("http://localhost:8080/api/auth/changepassword", resetPassword);
  }

  authenticate(username: string, password: string) {

    return this.http.post<any>('http://localhost:8080/api/auth/authenticate',
      { username, password })
      .pipe(
        map((userData => {
          sessionStorage.setItem('userId', userData.userId)
          sessionStorage.setItem('name', userData.name)
          sessionStorage.setItem('email', userData.email)
          sessionStorage.setItem('userrole', userData.roles)
          sessionStorage.setItem('token', 'Bearer ' + userData.token)
          this.nameSubject.next(userData.name);

          //emit values so that subscriber will get updated value
          this.loginStatus.next(true)

          this.username.next(sessionStorage.getItem('email'))
          this.userrole.next(sessionStorage.getItem('userrole'))
          return userData
        })
        )
      )
  }
  //authentication logic
  //will decide whether user is logged or not 
  //will get to know role and can be used to return in getROle()

  isUserLoggedIn() {
    let username = sessionStorage.getItem('email')
    return !(username === null)
  }
  getRole() {
    return sessionStorage.getItem('userrole')
  }
  logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('userrole')

    //emit values
    this.loginStatus.next(false)
    //@ts-ignore
    this.username.next(null)
    //@ts-ignore
    this.userrole.next(null)
  }

  //validate EmailForOTP
  validateEmail(email:string){
   return this.http.get(`http://localhost:8080/api/auth/forgetpassword/${email}`)
  }

  //validateOTP
  validateOtp(email:string, otp:number){
   return this.http.post(`http://localhost:8080/api/auth/validate/`,{email,otp})
  }

  //validateOTP
  changePassword(email:string, newPassword:string){
   return this.http.put(`http://localhost:8080/api/auth/password/`,{email,newPassword})
  }

  activateAccount(email:string, otp:number){
    return this.http.put(`http://localhost:8080/api/auth/activate/`,{email:email,otp:otp})
  }

  resendOTP(email:string){
    return this.http.get(`http://localhost:8080/api/auth/resent/${email}`)
  }

  changeNav(){
    this.userRole = sessionStorage.getItem('userrole');
    let name = sessionStorage.getItem('name') ? sessionStorage.getItem('name') : "";
    this.nameSubject.next(name);
    if(this.userRole === UserRole.DEPARTMENTHEAD)
        { 
          this.navbarMenuSubject.next(this.navBars.departmentNav);
          this.router.navigate(['/departmentReport'])
        }
        else if(this.userRole === UserRole.CITIZEN)
        { this.navbarMenuSubject.next(this.navBars.citizenNav);
          this.router.navigate(['/citizenhome'])
        } 
       else if(this.userRole === UserRole.ADMIN)
        { this.navbarMenuSubject.next(this.navBars.adminNav);
          this.router.navigate(['/adminReport'])
        }
        else{
          this.navbarMenuSubject.next(this.navBars.commonMenu);
        }
  }

}

export class NavBars {
  commonMenu: NabarMenu = {
    singleMenuArray: [
      

      {
        routerLink: '/login',
        title: 'Login'
      },
      {
        routerLink: '/registerCitizen',
        title: 'Signup'
      },
    ]
  }
  citizenNav: NabarMenu = {
    singleMenuArray: [
      {
        routerLink: '/citizenhome',
        title: 'Home'
      },
      {
        routerLink: '/registerComplaint',
        title: 'Complaint Register'
      }, {
        routerLink: '/citizenComplaints',
        title: 'My Complaints'
      }, 
      // {
      //   routerLink: '/registerCitizen',
      //   title: 'Register Citizen'
      // },
      {
        routerLink: '',
        title: ''
      },

    ],
    dropdownArray: [
      {
        dropdownTitle: "Setting",
        SingleMenu: [
          {
            title: "Change Password",
            routerLink: "/changepassword"
          },
        ]
      }
    ]
  }
  
  adminNav: NabarMenu = {
    singleMenuArray: [
      {
        routerLink: '/adminReport',
        title: 'Admin Dashboard'
      },
      
      {
        routerLink: '/complaints',
        title: 'View Complaints'
      },
      {
        routerLink: '/admin-dash',
        title: 'Stats'
      },

    ],
    dropdownArray: [
      
       {
        dropdownTitle: "Employee",
        SingleMenu: [
          {
            routerLink: '/registerEmployee',
            title: 'Register Employee'
          },
          {
            routerLink: '/employeeList',
            title: 'Manage Employee'
          }, {
            routerLink: '/lockedaccount',
            title: 'Locked Account'
          }
        ]
      },
      {
        dropdownTitle: "Department",
        SingleMenu: [
          {
            routerLink: '/registerDepartment',
            title: 'Register Department'
          },
          {
            routerLink: '/listDepartment',
            title: 'Manage Department'
          }
        ]
      },

      {
        dropdownTitle: "Setting",
        SingleMenu: [
          {
            title: "Change Password",
            routerLink: "/changepassword"
          },
        ]
      },
    ]
  }
  departmentNav: NabarMenu = {
    singleMenuArray: [
     
      {
        routerLink: '/departmentReport',
        title: 'Department Dashboard'
      },
      {
        routerLink: '/departmentComplaints',
        title: 'View Complaints'
      }, {
        routerLink: '',
        title: ''
      },

    ],
    dropdownArray: [
      {
        dropdownTitle: "Setting",
        SingleMenu: [
          {
            title: "Change Password",
            routerLink: "/changepassword"
          },
        ]
      }
    ]
  }

}
