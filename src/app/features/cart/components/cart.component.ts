import { Component, inject, computed, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/models/cart-item.interface';
import { MenuBar } from '../../../shared/components/menu-bar/menu-bar';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MenuBar, Footer],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly cartItems: Signal<CartItem[]> = this.cartService.getItems();
  
  readonly totalItems = this.cartService.totalItems;
  readonly subtotal = this.cartService.totalPrice;
  
  // Costo de envío fijo
  readonly shippingCost = 1.99;
  
  // Total incluyendo envío
  readonly total = computed(() => this.subtotal() + this.shippingCost);

  readonly isEmpty = computed(() => this.cartItems().length === 0);

  increaseQuantity(productId: number, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }


  decreaseQuantity(productId: number, currentQuantity: number): void {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(productId, currentQuantity - 1);
    } else {
      this.removeProduct(productId);
    }
  }


  removeProduct(productId: number): void {
    this.cartService.removeProduct(productId);
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}

