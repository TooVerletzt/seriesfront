import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor llena todos los campos.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: data => {
        // ✅ Guardar token y username
        this.storageService.setToken(data.accessToken);
        this.storageService.setUser(data.username);  // o data.username

        console.log('✅ Login exitoso:', data);
        this.router.navigate(['/home']);
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Error al iniciar sesión.';
        console.error(err);
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
