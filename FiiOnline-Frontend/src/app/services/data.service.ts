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
    .map((res) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  fetchFile(url){
    return this.http.get(`${url}`, {responseType: 'blob'}).catch((error: any) => Observable.throw(error || 'Server error'))
    .map((res) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  postData(url, jsonObject) {
    let headers = new HttpHeaders();
    // if (sessionStorage.getItem('authorization') !== '') {
    //   headers =headers.append('authorization', sessionStorage.getItem('authorization'));
    // }
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(url, jsonObject).catch((error: any) => Observable.throw(error || 'Server error'));
  }

  putData(url, jsonObject) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put(url, jsonObject).catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteData(url) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.delete(url, {headers: headers}).catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
