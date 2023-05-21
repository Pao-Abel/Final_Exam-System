import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  constructor(private router: Router) {}

  logout() {
    // Perform any necessary logout actions (e.g., clearing session, removing tokens, etc.)

    // Navigate to the desired route (e.g., login page)
    this.router.navigate(['/login']);
  }
}
