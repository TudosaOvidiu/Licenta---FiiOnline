import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {DataService} from './data.service';
import {Observable} from 'rxjs/Observable';
import {GlobalVariable} from '../config/global';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) {
    // set token if saved in local storage
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    this.token = currentUser && currentUser.token;
  }

  login(loginModel: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/javascript');
    return this.http.get(`${GlobalVariable.BASE_API_URL}/Account/auth?email=${loginModel.email}&password=${loginModel.password}`, {headers: headers})
      .map((response: HttpResponse<string>) => {
        // login successful if there's a jwt token in the response
        const token = 'Bearer ' + response['token'];
        let user = response['appUser'];
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          // sessionStorage.setItem('currentUser', JSON.stringify(loginModel));

          sessionStorage.setItem('authorization', token);
          sessionStorage.setItem('user', JSON.stringify(user));

          // return true to indicate successful login
          return user;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    Object.keys(sessionStorage)
      .forEach(function (k) {
        sessionStorage.removeItem(k);
      });
    this.router.navigate(['']);
  }
}
