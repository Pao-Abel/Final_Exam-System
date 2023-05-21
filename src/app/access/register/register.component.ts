import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {
  formData = {
    username: '',
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { } // Inject Router

  registerUser() {
    this.http.post('api/users/register', this.formData)
      .subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          this.router.navigate(['client']);
          console.log('Registration successful');
          
          // Perform any additional actions upon successful registration
        },
        (error: any) => {
          console.error('Registration failed:', error);
          // Handle error response
        }
      );
  }
}
