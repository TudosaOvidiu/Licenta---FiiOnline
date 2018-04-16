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
import { UserRegisterComponent } from './components/common/user-register/user-register.component';
import { AccountConfirmationComponent } from './components/common/account-confirmation/account-confirmation.component';
import { UploadCourseComponent } from './components/admin/upload-course/upload-course.component';
import { UploadLessonComponent } from './components/professor/upload-lesson/upload-lesson.component';
import {EditCourseComponent} from './components/admin/upload-course/edit-course.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import {CoursesListComponent} from './components/common/courses-list/courses-list.component';
import { LessonListComponent } from './components/common/lessons-list/lessons-list.component';
import { WeekComponent } from './components/professor/week/week.component';
import {MyTabsComponent} from './components/common/Wrappers/mytab.component';
import { MaterialGenericComponent } from './components/common/material-generic/material-generic.component';
import { LessonGenericComponent } from './components/common/lesson-generic/lesson-generic.component';


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
    SidebarComponent,
    CoursesListComponent,
    LessonListComponent,
    WeekComponent,
    MyTabsComponent,
    MaterialGenericComponent,
    LessonGenericComponent,
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
