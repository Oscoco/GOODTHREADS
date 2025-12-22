import { Component, ViewChild, AfterViewInit, OnDestroy, signal, Inject, PLATFORM_ID } from '@angular/core';
import { ProductListComponent } from '../../features/products/components/product-list.component';
import { MenuBar } from '../../shared/components/menu-bar/menu-bar';
import { Footer } from '../../shared/components/footer/footer';
import { Loader } from '../../shared/loader/loader';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductListComponent, MenuBar, Footer, Loader, CommonModule],
  styleUrl: './products-page.component.scss',
  template: `
    @if (isLoading()) {
      <div class="loader-wrapper" [class.fade-out]="!showLoader()">
        <app-loader></app-loader>
      </div>
    }
    
    <div class="flex flex-col min-h-screen">
      <app-menu-bar></app-menu-bar>
      
      <main class="grow">
        <app-product-list #productList></app-product-list>
      </main>
      
      <app-footer></app-footer>
    </div>
  `
})
export class ProductsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('productList') productListComponent!: ProductListComponent;
  isLoading = signal<boolean>(true);
  showLoader = signal<boolean>(true);
  private loadingCheckInterval?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.productListComponent) {
      this.isLoading.set(this.productListComponent.isLoading());
      this.showLoader.set(this.productListComponent.isLoading());
      
      this.loadingCheckInterval = window.setInterval(() => {
        if (this.productListComponent) {
          const currentLoading = this.productListComponent.isLoading();
          this.isLoading.set(currentLoading);
          
          if (!currentLoading && this.showLoader()) {
            setTimeout(() => {
              this.showLoader.set(false);
              setTimeout(() => {
                this.isLoading.set(false);
              }, 500);
            }, 100);
          }
          
          if (!currentLoading && this.loadingCheckInterval) {
            clearInterval(this.loadingCheckInterval);
          }
        }
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.loadingCheckInterval) {
      clearInterval(this.loadingCheckInterval);
    }
  }
}

