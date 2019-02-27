import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) {
   return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
      .map( response => {
          // console.log(response.json());
          let result = response.json();
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            return true;
          } else {
            return false;
          }
      });
  }

  logout() {
    localStorage.removeItem('token');
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

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }
}

