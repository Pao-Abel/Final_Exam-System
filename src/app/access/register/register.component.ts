import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formData = {
    username: '',
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  registerUser() {
    this.http.post('http://localhost:3306/api/register', this.formData).subscribe(
      response => {
        // Handle successful registration response
        console.log(response);
      },
      error => {
        // Handle error response
        console.error(error);
      }
    );
  }
}
