import {CanActivate, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    if (sessionStorage.getItem('authorization') !== null) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class NotLoggedGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    if (isNullOrUndefined(sessionStorage.getItem('authorization'))) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private location: Location) {
  }

  canActivate() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user.role === 'Administrator') {
      return true;
    }
    this.location.back();
    return false;
  }
}

@Injectable()
export class ProfessorGuard implements CanActivate {
  constructor(private location: Location) {
  }

  canActivate() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user.role === 'Professor') {
      return true;
    }
    console.log('should go back');
    this.location.back();
    return false;
  }
}

@Injectable()
export class StudentGuard implements CanActivate {
  constructor(private location: Location) {
  }

  canActivate() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user.role === 'Student') {
      return true;
    }
    this.location.back();
    return false;
  }
}

@Injectable()
export class AdminStudentGuard implements CanActivate {
  constructor(private location: Location) {
  }

  canActivate() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user.role === 'Student' || user.role === 'Administrator') {
      return true;
    }
    this.location.back();
    return false;
  }
}

@Injectable()
export class AdminProfessorGuard implements CanActivate {
  constructor(private location: Location) {
  }

  canActivate() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user.role === 'Professor' || user.role === 'Administrator') {
      return true;
    }
    this.location.back();
    return false;
  }
}
