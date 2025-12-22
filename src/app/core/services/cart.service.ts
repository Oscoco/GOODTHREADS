import { Injectable, signal, computed, inject } from '@angular/core';
import { CartItem } from '../models/cart-item.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartItems = signal<CartItem[]>([]);

  readonly totalItems = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });


  readonly totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  });


  getItems() {
    return this.cartItems.asReadonly();
  }

  /**
   * Agrega un producto al carrito o incrementa su cantidad si ya existe
   * @param product
   * @param quantity
   */
  addProduct(product: Product, quantity: number = 1): void {
    if (quantity <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }

    this.cartItems.update(items => {
      const existingItemIndex = items.findIndex(item => item.product.id === product.id);

      if (existingItemIndex >= 0) {
        
        const updatedItems = [...items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {

        return [...items, { product, quantity }];
      }
    });
  }

  /**
   * Elimina un producto del carrito por su ID
   * @param productId
   */
  removeProduct(productId: number): void {
    this.cartItems.update(items => 
      items.filter(item => item.product.id !== productId)
    );
  }

  /**
   * Actualiza la cantidad de un producto en el carrito
   * @param productId
   * @param quantity
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeProduct(productId);
      return;
    }

    this.cartItems.update(items => {
      return items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      );
    });
  }

  /**
   * Limpia todos los productos del carrito
   */
  clearCart(): void {
    this.cartItems.set([]);
  }

  /**
   * Verifica si un producto está en el carrito
   * @param productId
   * @returns
   */
  isProductInCart(productId: number): boolean {
    return this.cartItems().some(item => item.product.id === productId);
  }

  /**
   * Obtiene la cantidad de un producto específico en el carrito
   * @param productId
   * @returns
   */
  getProductQuantity(productId: number): number {
    const item = this.cartItems().find(item => item.product.id === productId);
    return item?.quantity ?? 0;
  }
}

