import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  username: string = '';
  mobile: string = '';
  constructor(private router: Router) {}
  ngOnInit() {
    this.username = localStorage.getItem('username') || 'Guest';
    this.mobile = localStorage.getItem('mobile') || 'Unknown';
  }

  onLogout() {
    localStorage.removeItem('token'); // ✅ Remove JWT token
    localStorage.removeItem('username');
    localStorage.removeItem('mobile');
    this.router.navigate(['/']); // ✅ Redirect to login page
  }
}
