import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:3000/users/login';
  private registerUrl = 'http://localhost:3000/users/register';

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(userdetails) {
    return this.http.post(this.loginUrl, userdetails);
  }

  registerUser(userdetails) {
    return this.http.post(this.registerUrl, userdetails);
  }

  getToken() {
   return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  dashboard() {
    return this.http.get('http://localhost:3000/users/dashboard');
  }

}
