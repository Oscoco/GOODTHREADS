import { Component, inject, computed, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../core/models/cart-item.interface';
import { MenuBar } from '../../../../shared/components/menu-bar/menu-bar';
import { Footer } from '../../../../shared/components/footer/footer';
import { PaySuccess } from '../pay-success/pay-success';
import { Loader } from '../../../../shared/loader/loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MenuBar, Footer, PaySuccess, Loader],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly cartItems: Signal<CartItem[]> = this.cartService.getItems();
  readonly totalItems = this.cartService.totalItems;
  readonly subtotal = this.cartService.totalPrice;
  
  // Costo de envío fijo
  readonly shippingCost = 1.99;
  
  // Formulario
  checkoutForm: FormGroup;
  discountCode = '';
  saveInfo = false;
  
  // Control del modal de éxito
  showPaymentSuccess = signal<boolean>(false);
  transactionId = signal<string>('');
  customerName = signal<string>('');
  
  // Control del loader
  isProcessingPayment = signal<boolean>(false);

  // Computed para calcular totales
  readonly total = computed(() => {
    return this.subtotal() + this.shippingCost;
  });


  readonly finalTotal = computed(() => {
    return this.subtotal() + this.shippingCost;
  });

  constructor() {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      country: ['El Salvador', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      apartment: [''],
      city: ['', Validators.required],
      postalCode: [''],
      region: ['San Salvador', Validators.required],
      phone: ['', Validators.required],
      saveInfo: [false]
    });
  }

  /**
   * Aplica un código de descuento
   */
  applyDiscount(): void {
    console.log('Aplicando código de descuento:', this.discountCode);
  }

  /**
   * Procesa el pago
   */
  processPayment(): void {
    if (this.checkoutForm.valid) {
      // Mostrar loader
      this.isProcessingPayment.set(true);
      
      // Obtener nombre del cliente del formulario
      const firstName = this.checkoutForm.get('firstName')?.value || '';
      const lastName = this.checkoutForm.get('lastName')?.value || '';
      const fullName = `${firstName} ${lastName}`.trim();
      this.customerName.set(fullName || 'Cliente');
      
      // Generar ID de transacción
      const id = Math.floor(1000000 + Math.random() * 9000000).toString();
      this.transactionId.set(id);
      
      // Simular procesamiento del pago (validaciones)
      setTimeout(() => {
        // Limpiar carrito
        this.cartService.clearCart();
        
        // Ocultar loader
        this.isProcessingPayment.set(false);
        
        // Mostrar modal de éxito
        this.showPaymentSuccess.set(true);
      }, 2000); // 2 segundos de "procesamiento"
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.checkoutForm.controls).forEach(key => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
    }
  }

  /**
   * Cierra el modal de éxito
   */
  closePaymentSuccess(): void {
    this.showPaymentSuccess.set(false);
    this.router.navigate(['/products']);
  }

  /**
   * Navega de vuelta al carrito
   */
  goBackToCart(): void {
    this.router.navigate(['/cart']);
  }

  /**
   * Verifica si un campo tiene errores
   */
  hasError(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  /**
   * Obtiene el mensaje de error de un campo
   */
  getErrorMessage(fieldName: string): string {
    const field = this.checkoutForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('email')) {
      return 'Ingresa un email válido';
    }
    return '';
  }
}

