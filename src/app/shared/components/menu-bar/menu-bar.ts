import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-menu-bar',
  imports: [RouterLink],
  templateUrl: './menu-bar.html',
  styleUrl: './menu-bar.scss',
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 50;
      width: 100%;
    }
  `
})
export class MenuBar {
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  
  isMenuOpen = signal(false);
  isSearchOpen = signal(false);
  searchQuery = signal('');
  
  // Signal para obtener el total de items en el carrito
  readonly totalItems = this.cartService.totalItems;

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  openSearch() {
    this.isSearchOpen.set(true);
  }

  closeSearch() {
    this.isSearchOpen.set(false);
    this.searchQuery.set('');
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
