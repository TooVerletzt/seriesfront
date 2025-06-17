import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service'; // 👈 Asegúrate de que el path es correcto

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getToken(); // ✅ Usamos la misma clave que se guarda

    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
