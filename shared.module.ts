import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { OTPVerificationComponent } from './otpverification/otpverification.component';
import { OTPGenerationComponent } from './otpgeneration/otpgeneration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { AdminService } from './services/admin.service';
import { AppRoutingModule } from '../app-routing.module';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { SearchPipePipe } from './pipe/search-pipe.pipe';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { GraphComponent } from './graph/graph.component';

import { PaginationComponent } from './pagination/pagination.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [NavbarComponent, OTPVerificationComponent, OTPGenerationComponent, ResetPasswordComponent,LoginComponent,UploadFileComponent, ChatWindowComponent, SearchPipePipe, ChangePasswordComponent, PaginationComponent,GraphComponent, FooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule
    ],
  exports:[OTPGenerationComponent,OTPVerificationComponent,ResetPasswordComponent,NavbarComponent,LoginComponent,
           UploadFileComponent,SearchPipePipe,ChatWindowComponent,PaginationComponent,GraphComponent,FooterComponent],

})
export class SharedModule { 

}
