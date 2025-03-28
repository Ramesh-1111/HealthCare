import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  mobile: string = '';
  username: string = ''; // ✅ Ensure username is included

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.mobile.match(/^[0-9]{10}$/)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!this.username.trim()) {
      alert('Please enter your name.');
      return;
    }

    this.http
      .post<{ message: string; user?: any; token?: string }>(
        'http://localhost:3000/auth', // ✅ Match backend port
        { mobile: this.mobile, username: this.username } // ✅ Include username
      )
      .subscribe({
        next: (response) => {
          if (response.user) {
            localStorage.setItem('token', response.token || ''); // ✅ Store token
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          alert(
            error.error?.message || 'Something went wrong. Please try again.'
          );
          console.error('Error:', error);
        },
      });
  }
}
