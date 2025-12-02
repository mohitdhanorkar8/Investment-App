import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'], 
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Validate user credentials from localStorage
    if (user.username === this.username && user.password === this.password) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/investment-list']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
