import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../../../../core/models/product.interface';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MenuBar } from '../../../../shared/components/menu-bar/menu-bar';
import { Footer } from '../../../../shared/components/footer/footer';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MenuBar, Footer],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  // Signals
  product = signal<Product | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  
  // Selección de opciones
  selectedSize = signal<string>('S');
  selectedFit = signal<string>('Regular Fit');
  quantity = signal<number>(1);
  
  // Estado del botón de carrito
  isAddedToCart = signal<boolean>(false);

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (!productId || isNaN(productId)) {
      this.errorMessage.set('ID de producto inválido');
      this.isLoading.set(false);
      return;
    }

    this.productService.getProductById(productId)
      .pipe(
        catchError((error) => {
          console.error('Error al cargar el producto:', error);
          this.errorMessage.set('Error al cargar el producto. Por favor, intenta nuevamente.');
          return of(undefined);
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (product) => {
          if (product) {
            this.product.set(product);
          } else {
            this.errorMessage.set('Producto no encontrado');
          }
        },
        error: (error) => {
          console.error('Error en la suscripción:', error);
          this.errorMessage.set('Error al cargar el producto. Por favor, intenta nuevamente.');
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  retryLoadProduct(): void {
    this.loadProduct();
  }

  selectSize(size: string): void {
    this.selectedSize.set(size);
  }

  selectFit(fit: string): void {
    this.selectedFit.set(fit);
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  increaseQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  addToCart(): void {
    const currentProduct = this.product();
    
    if (!currentProduct) {
      return;
    }

    this.cartService.addProduct(currentProduct, this.quantity());
    
    this.isAddedToCart.set(true);
    
    setTimeout(() => {
      this.isAddedToCart.set(false);
    }, 2000);
  }
}

