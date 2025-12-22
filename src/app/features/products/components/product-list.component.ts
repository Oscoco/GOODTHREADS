import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.interface';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgClass } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgClass, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);

  // Signals
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  gridColumns = signal<number>(4); // 2 o 4 columnas

  gridClass = computed(() => {
    if (this.gridColumns() === 2) {
      return 'grid-cols-1 sm:grid-cols-2';
    } else {
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  });

  get loadingState() {
    return this.isLoading();
  }

  toggleGridColumns(): void {
    this.gridColumns.set(this.gridColumns() === 4 ? 2 : 4);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.productService.getProducts()
      .pipe(
        catchError((error) => {
          console.error('Error al cargar productos:', error);
          this.errorMessage.set('Error al cargar los productos. Por favor, intenta nuevamente.');
          return of([]);
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (products) => {
          this.products.set(products);
        },
        error: (error) => {
          console.error('Error en la suscripción:', error);
          this.errorMessage.set('Error al cargar los productos. Por favor, intenta nuevamente.');
        }
      });
  }
}

