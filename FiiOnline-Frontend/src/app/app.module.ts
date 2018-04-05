import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './components/common/login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './routing/app-routing.module';
import {DataService} from './services/data.service';
import { ForgotPasswordComponent } from './components/common/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/common/reset-password/reset-password.component';
import { MaterializeModule } from 'angular2-materialize';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AccountConfirmationComponent } from './components/common/account-confirmation/account-confirmation.component';
import { UploadCourseComponent } from './components/admin/upload-course/upload-course.component';
import { UploadLessonComponent } from './components/professor/upload-lesson/upload-lesson.component';
import {EditCourseComponent} from './components/admin/upload-course/edit-course.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserRegisterComponent,
    AccountConfirmationComponent,
    UploadCourseComponent,
    UploadLessonComponent,
    EditCourseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [AuthenticationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
