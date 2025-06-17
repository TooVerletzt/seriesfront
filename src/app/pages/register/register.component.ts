import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Ahora puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Error al registrar usuario.';
        console.error(err);
      }
    });
  }

   togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
