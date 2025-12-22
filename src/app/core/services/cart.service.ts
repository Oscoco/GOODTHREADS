import { Injectable, signal, computed, inject, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartItem } from '../models/cart-item.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private static readonly STORAGE_KEY = 'good-threads-cart';
  private readonly platformId = inject(PLATFORM_ID);
  
  private readonly cartItems = signal<CartItem[]>(this.loadCartFromStorage());

  constructor() {
    // Effect para guardar automáticamente en localStorage cuando cambie el carrito
    effect(() => {
      const items = this.cartItems();
      if (isPlatformBrowser(this.platformId)) {
        this.saveCartToStorage(items);
      }
    });
  }

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
   * El effect automáticamente limpiará el localStorage
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

  /**
   * Carga el carrito desde localStorage si existe
   * @returns Array de CartItem o array vacío si no hay datos o hay error
   */
  private loadCartFromStorage(): CartItem[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    try {
      const storedData = localStorage.getItem(CartService.STORAGE_KEY);
      if (!storedData) {
        return [];
      }

      const items = JSON.parse(storedData) as CartItem[];
      // Validar que los datos sean un array válido
      if (Array.isArray(items)) {
        return items;
      }
      return [];
    } catch (error) {
      console.error('Error al cargar el carrito desde localStorage:', error);
      // Si hay error, limpiar los datos corruptos
      this.clearStorage();
      return [];
    }
  }

  /**
   * Guarda el carrito en localStorage
   * @param items - Array de items del carrito a guardar
   */
  private saveCartToStorage(items: CartItem[]): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(CartService.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }

  /**
   * Limpia los datos del carrito en localStorage
   */
  private clearStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.removeItem(CartService.STORAGE_KEY);
    } catch (error) {
      console.error('Error al limpiar el localStorage:', error);
    }
  }
}

