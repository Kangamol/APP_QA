import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/userLogin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mainApi = 'http://172.16.0.2:3000';
  defaultUser: UserLogin;

  private UserIsAuthenticated = false;

  get userIsAuthenticated() {
    return this.UserIsAuthenticated;
  }

  constructor(private http: HttpClient) { }

  login() {
    this.UserIsAuthenticated = true;
  }

  logout() {
    this.defaultUser = undefined;
    // console.log('service -> ', this.defaultUser);
    this.UserIsAuthenticated = false;
  }

  setUserInfo(userLogin: UserLogin) {
    this.defaultUser = userLogin;
    // console.log('Service Set User -> ', this.defaultUser);
  }

  getUserInfo() {
    return this.defaultUser;
  }

  getUser(userid: string): Observable<UserLogin> {
    return this.http.get<UserLogin>(this.mainApi + '/getuser/' + userid);
  }

}
