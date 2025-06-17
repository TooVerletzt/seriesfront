import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setToken(token: string): void {
    localStorage.setItem('accessToken', token);  // ✅ así lo manda el backend
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  clearToken(): void {
    localStorage.removeItem('accessToken');
  }

  setUser(user: string): void {
    localStorage.setItem('user', user);
  }

  getUser(): string | null {
    return localStorage.getItem('user');
  }

  clearUser(): void {
    localStorage.removeItem('user');
  }

  signOut(): void {
    localStorage.clear();
  }
}
