import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuBar } from '../../shared/components/menu-bar/menu-bar';
import { Footer } from '../../shared/components/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thank-you-page',
  standalone: true,
  imports: [MenuBar, Footer, RouterLink, CommonModule],
  templateUrl: './thank-you-page.component.html',
  styleUrl: './thank-you-page.component.scss'
})
export class ThankYouPageComponent {
  constructor(private readonly router: Router) {}

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}

