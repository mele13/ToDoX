import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { Board } from 'src/app/models/board';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) { }

  // Registers a user
  registerUser(name: string, email: string, password: string): Observable<User> {
    const url = `${this.apiUrl}/register`;
    const user = {
      name: name,
      email: email,
      password: password,
    };
    return this.http.post<User>(url, user);
  }

  // Authenticates a user
  authenticateUser(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const credentials = {
      email: email,
      password: password,
    };
    return this.http.post(url, credentials);
  }
}
