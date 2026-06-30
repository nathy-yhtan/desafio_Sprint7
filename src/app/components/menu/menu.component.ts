import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isMenuAberto: boolean = false;

  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate([""])
  }
}