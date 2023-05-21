import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.error = '';
    const url = 'api/users';
    const body = { email: this.email, password: this.password };

    this.http.post(url, body).subscribe(
      (response: any) => {
        if (response && response.id) {
          console.log('Login successful:', response);
          this.router.navigate(['client']);
        } else {
          this.error = 'Invalid email or password';
        }
      },
      (error: any) => {
        this.error = 'An error occurred. Please try again.';
      }
    );
  }
}
