import { Component, AfterViewInit, OnDestroy, signal, ElementRef, ViewChildren, QueryList, afterNextRender, Inject, PLATFORM_ID } from '@angular/core';
import { NgClass, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-featured-products',
  imports: [NgClass],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
})
export class FeaturedProducts implements AfterViewInit, OnDestroy {
  @ViewChildren('productCard') productCards!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  products = [
    {
      id: 1,
      name: 'Sudadera Jujutsu Kaisen',
      price: 49.99,
      image: '/assets/images/sudadera1.jpg',
      category: 'JUJUTSU KAISEN'
    },
    {
      id: 2,
      name: 'Sudadera One Piece',
      price: 49.99,
      image: '/assets/images/sudadera1.jpg',
      category: 'ONE PIECE'
    },
    {
      id: 3,
      name: 'Sudadera Naruto',
      price: 49.99,
      image: '/assets/images/sudadera1.jpg',
      category: 'NARUTO'
    },
    {
      id: 4,
      name: 'Sudadera Dandadan',
      price: 49.99,
      image: '/assets/images/sudadera1.jpg',
      category: 'DANDADAN'
    }
  ];

  visibleProducts = signal<Set<number>>(new Set());
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    if (this.productCards.length > 0) {
      setTimeout(() => {
        this.setupIntersectionObserver();
      }, 100);
    } else {
      setTimeout(() => {
        this.setupIntersectionObserver();
      }, 300);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.observer) {
      const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.01
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const productId = parseInt(entry.target.getAttribute('data-product-id') || '0');
            this.visibleProducts.update(visible => {
              const newSet = new Set(visible);
              newSet.add(productId);
              return newSet;
            });
          }
        });
      }, options);
    }

    if (this.productCards && this.productCards.length > 0) {
      this.productCards.forEach((card, index) => {
        if (card?.nativeElement) {
          const element = card.nativeElement;
          element.setAttribute('data-product-id', index.toString());
          
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          const isVisible = rect.top < windowHeight + 100 && rect.bottom > -100;
          
          if (isVisible) {
            setTimeout(() => {
              this.visibleProducts.update(visible => {
                const newSet = new Set(visible);
                newSet.add(index);
                return newSet;
              });
            }, 50);
          } else {
            this.observer?.observe(element);
          }
        }
      });
    }
  }

  isProductVisible(index: number): boolean {
    return this.visibleProducts().has(index);
  }

  getAnimationDelay(index: number): string {
    return `${index * 0.15}s`;
  }
}

