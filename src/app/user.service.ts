import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiUrl = 'http://localhost:3000/api/user';
  private apiUrl = 'https://srv65135.seohost.com.pl/api/user';

  constructor(private http : HttpClient) { }

  login(user: User) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

}
