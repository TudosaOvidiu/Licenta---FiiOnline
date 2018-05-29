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
import {CoursesMenuComponent} from '../components/common/courses-menu/courses-menu.component';
import {
  AdminGuard, AdminProfessorGuard, AdminStudentGuard, LoginGuard, NotLoggedGuard, ProfessorGuard,
  StudentGuard
} from '../services/guards.service';
import {PostComponent} from '../components/common/post/post.component';
import {PostsListComponent} from '../components/common/posts-list/posts-list.component';
import {FollowersListComponent} from '../components/professor/followers-list/followers-list.component';


const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [NotLoggedGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'account-confirmation', component: AccountConfirmationComponent},
  {path: 'create-course', component: UploadCourseComponent, canActivate: [AdminGuard, LoginGuard]},
  {path: 'upload-material', component: UploadLessonComponent, canActivate: [ProfessorGuard, LoginGuard]},
  {path: 'edit-course/:id', component: EditCourseComponent, canActivate: [AdminGuard, LoginGuard]},
  {path: 'edit-material/:id', component: UploadLessonComponent, canActivate: [ProfessorGuard, LoginGuard]},
  {path: 'register-professor', component: UserRegisterComponent, canActivate: [AdminGuard, LoginGuard]},
  {path: 'admin-courses', component: CoursesListComponent, canActivate: [AdminGuard, LoginGuard]},
  {path: 'professor-courses', component: CoursesListComponent, canActivate: [ProfessorGuard, LoginGuard]},
  {path: 'courses', component: CoursesMenuComponent, canActivate: [AdminStudentGuard, LoginGuard]},
  {path: 'professor-lessons/:id', component: LessonListComponent},
  {path: 'lessons/:id', component: LessonListComponent, canActivate: [StudentGuard, LoginGuard]},
  {path: 'create-lesson', component: WeekComponent, canActivate: [ProfessorGuard, LoginGuard]},
  {path: 'edit-lesson/:id', component: WeekComponent, canActivate: [ProfessorGuard, LoginGuard]},
  {path: 'courses-list', component: CoursesListComponent, canActivate: [AdminStudentGuard, LoginGuard]},
  {path: 'edit-profile', component: UserRegisterComponent, canActivate: [StudentGuard, LoginGuard]},
  {path: 'edit-prof-profile', component: UserRegisterComponent, canActivate: [ProfessorGuard, LoginGuard]},
  {path: 'add-post', component: PostComponent, canActivate: [AdminProfessorGuard, LoginGuard]},
  {path: 'news', component: PostsListComponent, canActivate: [StudentGuard, LoginGuard]},
  {path: 'professor-posts', component: PostsListComponent, canActivate: [ProfessorGuard, LoginGuard]},
  {path: 'admin-posts', component: PostsListComponent, canActivate: [AdminGuard, LoginGuard]},
  {path: 'edit-post/:id', component: PostComponent, canActivate: [AdminProfessorGuard, LoginGuard]},
  {path: 'followers/:id', component: FollowersListComponent, canActivate: [ProfessorGuard, LoginGuard]},
  {path: 'student-followed-courses', component: CoursesListComponent, canActivate: [StudentGuard, LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

