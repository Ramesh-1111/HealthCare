import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('token'); // ✅ Remove JWT token
    this.router.navigate(['/']); // ✅ Redirect to login page
  }
}
