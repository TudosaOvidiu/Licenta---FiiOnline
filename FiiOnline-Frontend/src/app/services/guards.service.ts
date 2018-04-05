import {CanActivate, Router} from '@angular/router';
import {isNullOrUndefined} from "util";
import {Injectable} from '@angular/core';

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
