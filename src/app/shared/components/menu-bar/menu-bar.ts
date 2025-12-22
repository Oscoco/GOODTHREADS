import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  isMenuOpen = signal(false);
  isSearchOpen = signal(false);
  searchQuery = signal('');

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
}
