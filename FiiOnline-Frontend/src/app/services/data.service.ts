import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  fetchData(url) {
    let headers = new HttpHeaders();
    // if (sessionStorage.getItem('authorization') !== '' || sessionStorage.getItem('authorization') !== null) {
    //   headers = headers.append('authorization', sessionStorage.getItem('authorization'));
    // }
    return this.http.get(`${url}`, {headers: headers}).catch((error: any) => Observable.throw(error || 'Server error'))
    .map((res) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  postData(url, jsonObject) {
    let headers = new HttpHeaders();
    // if (sessionStorage.getItem('authorization') !== '') {
    //   headers =headers.append('authorization', sessionStorage.getItem('authorization'));
    // }
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(url, jsonObject, {headers: headers}).catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
