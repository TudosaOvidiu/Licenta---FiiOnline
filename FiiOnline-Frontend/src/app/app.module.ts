import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './components/common/login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './routing/app-routing.module';
import {DataService} from './services/data.service';
import {ForgotPasswordComponent} from './components/common/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/common/reset-password/reset-password.component';
import {MaterializeModule} from 'angular2-materialize';
import {UserRegisterComponent} from './components/common/user-register/user-register.component';
import {AccountConfirmationComponent} from './components/common/account-confirmation/account-confirmation.component';
import {UploadCourseComponent} from './components/admin/upload-course/upload-course.component';
import {UploadLessonComponent} from './components/professor/upload-lesson/upload-lesson.component';
import {EditCourseComponent} from './components/admin/upload-course/edit-course.component';
import {SidebarComponent} from './components/common/sidebar/sidebar.component';
import {CoursesListComponent} from './components/common/courses-list/courses-list.component';
import {LessonListComponent} from './components/common/lessons-list/lessons-list.component';
import {WeekComponent} from './components/professor/week/week.component';
import {MyTabsComponent} from './components/common/Wrappers/mytab.component';
import {MaterialGenericComponent} from './components/common/material-generic/material-generic.component';
import {LessonGenericComponent} from './components/common/lesson-generic/lesson-generic.component';
import {CoursesMenuComponent} from './components/common/courses-menu/courses-menu.component';
import {NgxEditorModule} from 'ngx-editor';
import {
  AdminGuard, AdminProfessorGuard, AdminStudentGuard, LoginGuard, NotLoggedGuard, ProfessorGuard,
  StudentGuard
} from './services/guards.service';
import {PostComponent} from './components/common/post/post.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PostsListComponent} from './components/common/posts-list/posts-list.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {FollowersListComponent} from './components/professor/followers-list/followers-list.component';
import {ServiceWorkerModule} from '@angular/service-worker';

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
    CoursesMenuComponent,
    PostComponent,
    PostsListComponent,
    FollowersListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterializeModule,
    NgxEditorModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [AuthenticationService, DataService, AdminGuard, ProfessorGuard, StudentGuard, NotLoggedGuard, AdminStudentGuard, LoginGuard, AdminProfessorGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
