import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = ''; // Declare the email property
  pass: string = ''; // Declare the pass property

  formData = {
    username: this.email,
    password: this.pass
  };

  constructor(private http: HttpClient) { }

  login() {
    this.http.post('http://localhost:3306/api/login', this.formData).subscribe(
      response => {
        // Handle successful login response
        console.log(response);
        // You can perform further actions here, such as storing the user token, redirecting to another page, etc.
      },
      error => {
        // Handle error response
        console.error(error);
        // You can display an error message to the user or perform other error handling actions
      }
    );
  }
}
