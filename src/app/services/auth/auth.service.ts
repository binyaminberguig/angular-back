import { Injectable } from '@angular/core';
import { Auth} from '../../models/auth/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://localhost:3000';
  authToken: any;
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  checkLogin(body: Auth) {
    return this.http.post(`${this.uri}/auth/login`, body, this.httpOptions);
  }

  logout() {
    this.authToken = null;
    localStorage.clear();
  }
}
