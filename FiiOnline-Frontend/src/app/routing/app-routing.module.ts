import {Injectable, NgModule} from '@angular/core';
import {CanActivate, Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {ForgotPasswordComponent} from '../components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from '../components/reset-password/reset-password.component';
import {isNullOrUndefined} from 'util';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    //console.log(sessionStorage.getItem('authorization'));
    if (sessionStorage.getItem('authorization') !== null) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}

@Injectable()
export class NotLoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (isNullOrUndefined(sessionStorage.getItem('authorization'))){
      //console.log(sessionStorage.getItem('authorization'));
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user.username === 'Admin'){
      //console.log('Admin');
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}


const routes: Routes = [
  { path: 'login',  component: LoginComponent},
  { path: 'forgot-password',  component: ForgotPasswordComponent},
  { path: 'reset-password',  component: ResetPasswordComponent},
  // { path: 'profile', component: ProfilePageComponent, canActivate: [LoginGuard]},
  // { path: 'signup', component: SignupPageComponent},
  // { path: 'edit', component: EditPageComponent},
  // { path: 'update', component: UpdateComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

