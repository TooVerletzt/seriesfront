import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { JwtResponse } from '../models/auth/JwtResponse';

const AUTH_API = 'https://seriesbackspringboot.onrender.com/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', { username, email, password }, httpOptions);
  }

  login(username: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(AUTH_API + 'signin', { username, password }, httpOptions).pipe(
      tap(res => {
        this.storage.setToken(res.accessToken);
        this.storage.setUser(res.username);
      })
    );
  }
}
