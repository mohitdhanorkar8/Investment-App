import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Store user data in localStorage
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Check if user already exists in localStorage
    if (localStorage.getItem('user')) {
      this.errorMessage = 'User already registered';
      return;
    }

    // Save user data in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
