import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pay-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pay-success.html',
  styleUrl: './pay-success.scss',
})
export class PaySuccess {
  @Input() customerName: string = '';
  private readonly router = inject(Router);

  @Input() totalAmount: number = 0;
  @Input() transactionId: string = '';
  @Output() closeModal = new EventEmitter<void>();

  /**
   * Genera un ID de transacción aleatorio
   */
  generateTransactionId(): string {
    return Math.floor(1000000 + Math.random() * 9000000).toString().replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  /**
   * Obtiene la fecha y hora actual formateada
   */
  getCurrentDateTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate();
    const month = now.toLocaleString('es-ES', { month: 'short' });
    const year = now.getFullYear();
    return `${hours}:${minutes} | ${day} ${month} ${year}`;
  }

  /**
   * Navega a la página de productos
   */
  goToProducts(): void {
    this.closeModal.emit();
    this.router.navigate(['/products']);
  }

  /**
   * Cierra el modal
   */
  close(): void {
    this.closeModal.emit();
  }
}
