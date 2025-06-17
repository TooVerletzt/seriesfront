import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Guardar token
  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener token
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Eliminar token
  public clearToken(): void {
    localStorage.removeItem('token');
  }

  // Guardar usuario (ej: username o id)
  public setUser(user: string): void {
    localStorage.setItem('user', user);
  }

  // Obtener usuario
  public getUser(): string | null {
    return localStorage.getItem('user');
  }

  // Eliminar usuario
  public clearUser(): void {
    localStorage.removeItem('user');
  }

  // Limpiar todo (logout)
  public signOut(): void {
    localStorage.clear();
  }
}