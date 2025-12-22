import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  constructor(private router: Router) {}

  navigateToDetail(): void {
    this.router.navigate(['/products', this.product.id]);
  }
}

