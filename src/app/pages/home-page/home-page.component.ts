import { Component, AfterViewInit, signal, Inject, PLATFORM_ID } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { Descuentos } from '../../shared/components/descuentos/descuentos';
import { Hero } from '../../features/hero/hero';
import { MenuBar } from '../../shared/components/menu-bar/menu-bar';
import { FeaturedProducts } from '../../features/featured-products/featured-products';
import { ProductCategories } from '../../features/product-categories/product-categories';
import { Loader } from '../../shared/loader/loader';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Footer, Descuentos, Hero, MenuBar, FeaturedProducts, ProductCategories, Loader],
  template: `
    @if (isLoading()) {
      <div 
        class="fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500 ease-out"
        [class.opacity-0]="!showLoader()"
        [class.invisible]="!showLoader()">
        <app-loader></app-loader>
      </div>
    }
    
    <div class="flex flex-col min-h-screen">
      <app-descuentos></app-descuentos>
      
      @if (!isLoading()) {
        <app-menu-bar></app-menu-bar>
      }

      <app-hero></app-hero>
      
      <app-featured-products></app-featured-products>

      <app-product-categories></app-product-categories>
      
      <app-footer></app-footer>
    </div>
  `
})
export class HomePageComponent implements AfterViewInit {
  isLoading = signal<boolean>(true);
  showLoader = signal<boolean>(true);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.isLoading.set(false);
      this.showLoader.set(false);
      return;
    }

    // Esperar a que todo el contenido esté cargado
    setTimeout(() => {
      this.showLoader.set(false);
      setTimeout(() => {
        this.isLoading.set(false);
      }, 500);
    }, 1000);
  }
}

