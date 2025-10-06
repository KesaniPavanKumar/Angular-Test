import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.loading = true;
    this.error = null;

    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          // Store token from response
          if (res.accessToken) {
            localStorage.setItem('simbiotik_jwt', res.accessToken);
            this.router.navigate(['/todo']);
          } else {
            this.error = 'Login failed: No token returned';
          }
        },
        error: () => {
          this.loading = false;
          this.error = 'Invalid credentials';
        }
      });
  }


}
