import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor llena todos los campos.';
      return;
    }

    // 🚫 Ya no se usa AuthService ni token, solo redirige
    console.log('🔓 Login simulado, redirigiendo a /home');
    this.errorMessage = '';
    this.router.navigate(['/home']);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
