import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { CitizenModule } from './citizen/citizen.module';
import { DepartmentModule } from './department/department.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './shared/services/auth-service.service';
import { DepartmentService } from './shared/services/department.service';
import { AdminService } from './shared/services/admin.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GlobalErrorHandler } from './shared/services/global-error-handler.service';
import { HttpErrorInterceptor } from './shared/services/http-error-interceptor.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // CLI adds AppRoutingModule to the AppModule's imports array
    AdminModule,
    DepartmentModule,
    FormsModule,
    SharedModule,
    CitizenModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:'toast-top-right',
      closeButton:true
    }), // ToastrModule added
  ],
  providers: [AuthService,DepartmentService,AdminService,{
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true
      },
      {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true
      },
      ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
