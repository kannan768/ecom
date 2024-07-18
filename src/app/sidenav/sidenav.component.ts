import { Component, computed, HostListener, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  menuitem = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'product',
      route: '/product',
    },
    {
      icon: 'list',
      label: 'Product List',
      route: '/order',
    },
    {
      icon:'shopping_cart',
      label:'Add to cart',
      route:'/cart'
    }
  ]);
  collapsed = signal(false);
  sidenavwidth = computed(() => (this.collapsed() ? '65px' : '250px'));
  profilepic = computed(() => (this.collapsed() ? '32' : '100'));


  constructor(private router: Router) {}

  logout() {
    // Assuming you handle the login state in a service or parent component
    this.router.navigate(['/login']);
    localStorage.setItem('islogin','false')
    // Trigger any additional logout logic here
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'F11') {
      event.preventDefault();  // Prevent the default F11 behavior
      this.toggleFullscreen();
    }
  }
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.error(`Error attempting to exit fullscreen mode: ${err.message} (${err.name})`);
      });
    }
  }
}
