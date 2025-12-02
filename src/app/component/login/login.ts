import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
 
  private validUsername: string = 'admin';  // Dummy credentials for validation
  private validPassword: string = 'admin';

  constructor(private router: Router) {}

  // Submit form on login attempt
  onSubmit(form: any): void {
    // Reset error message if it was set previously
    this.errorMessage = '';

    if (this.username === this.validUsername && this.password === this.validPassword) {
      // Store user information and login status in localStorage
      localStorage.setItem('username', this.username);
      localStorage.setItem('isLoggedIn', 'true');  // You can also store a token here

      // Redirect to the investment list page or any other page
      this.router.navigate(['/investment-list']);
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }
}