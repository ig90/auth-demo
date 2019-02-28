import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  currentUser: any;

  constructor(private http: Http) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
   return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
      .map( response => {
          // console.log(response.json());
          let result = response.json();
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            let jwt = new JwtHelper();
            this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
            return true;
          } else {
            return false;
          }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {

    return tokenNotExpired();

    // const jwtHelper = new JwtHelperService();
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return false;
    // } else {
    // let expirationDate = jwtHelper.getTokenExpirationDate(token);
    // let isExpired = jwtHelper.isTokenExpired(token);
    // console.log('expiration', expirationDate);
    // console.log('isExpired', isExpired);
    // return !isExpired;
    // }
  }

  // get currentUser() {
  //   let token = localStorage.getItem('token');
  //   if (!token) {
  //     return null;
  //   }
  //   return new JwtHelperService().decodeToken(token);
  // }
}
