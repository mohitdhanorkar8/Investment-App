import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterModule, CommonModule],
})
export class App implements OnInit {
  showNavbar = true;
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if user is logged in from localStorage
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Listen for navigation changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Hide navbar if on the login route
      this.showNavbar = event.url !== '/register' && event.url !== '/login';
    });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}