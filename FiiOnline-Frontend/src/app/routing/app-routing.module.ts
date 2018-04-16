import {Injectable, NgModule} from '@angular/core';
import {CanActivate, Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../components/common/login/login.component';
import {ForgotPasswordComponent} from '../components/common/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from '../components/common/reset-password/reset-password.component';
import {UserRegisterComponent} from '../components/common/user-register/user-register.component';
import {AccountConfirmationComponent} from '../components/common/account-confirmation/account-confirmation.component';
import {UploadCourseComponent} from '../components/admin/upload-course/upload-course.component';
import {UploadLessonComponent} from '../components/professor/upload-lesson/upload-lesson.component';
import {EditCourseComponent} from '../components/admin/upload-course/edit-course.component';
import {CoursesListComponent} from '../components/common/courses-list/courses-list.component';
import {LessonListComponent} from '../components/common/lessons-list/lessons-list.component';
import {WeekComponent} from '../components/professor/week/week.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'account-confirmation', component: AccountConfirmationComponent},
  {path: 'upload-course', component: UploadCourseComponent},
  {path: 'upload-material', component: UploadLessonComponent},
  {path: 'edit-course/:id', component: EditCourseComponent},
  {path: 'edit-material/:id', component: UploadLessonComponent},
  {path: 'register-professor', component: UserRegisterComponent},
  {path: 'admin-courses', component: CoursesListComponent},
  {path: 'professor-courses', component: CoursesListComponent},
  {path: 'courses', component: CoursesListComponent},
  {path: 'professor-lessons/:id', component: LessonListComponent},
  {path: 'lessons/:id', component: LessonListComponent},
  {path: 'create-lesson', component: WeekComponent},
  {path: 'edit-lesson/:id', component: WeekComponent},


  // { path: 'profile', component: ProfilePageComponent, canActivate: [LoginGuard]},
  // { path: 'signup', component: SignupPageComponent},
  // { path: 'edit', component: EditPageComponent},
  // { path: 'update', component: UpdateComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

