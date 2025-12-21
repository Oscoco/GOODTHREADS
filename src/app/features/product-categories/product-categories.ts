import { Component, AfterViewInit, OnDestroy, signal, ElementRef, ViewChildren, QueryList, afterNextRender, Inject, PLATFORM_ID } from '@angular/core';
import { NgClass, isPlatformBrowser, CommonModule } from '@angular/common';
import { ASSETS_PATHS } from '../../core/constants/assets.constants';

@Component({
  selector: 'app-product-categories',
  imports: [NgClass, CommonModule],
  templateUrl: './product-categories.html',
  styleUrl: './product-categories.scss',
})
export class ProductCategories implements AfterViewInit, OnDestroy {
  @ViewChildren('categoryCard') categoryCards!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ASSETS_PATHS = ASSETS_PATHS;

  categories = [
    {
      id: 1,
      name: 'JUJUTSU KAISEN',
      image: ASSETS_PATHS.anime.jujutsu,
      description: 'Colección exclusiva'
    },
    {
      id: 2,
      name: 'ONE PIECE',
      image: ASSETS_PATHS.anime.onepiece,
      description: 'Nuevos diseños'
    },
    {
      id: 3,
      name: 'NARUTO',
      image: ASSETS_PATHS.anime.naruto,
      description: 'Edición limitada'
    },
    {
      id: 4,
      name: 'DANDADAN',
      image: ASSETS_PATHS.anime.dandadan,
      description: 'Últimas tendencias'
    }
  ];

  visibleCards = signal<Set<number>>(new Set());
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.setupIntersectionObserver();
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

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0');
          this.visibleCards.update(visible => {
            const newSet = new Set(visible);
            newSet.add(cardId);
            return newSet;
          });
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    setTimeout(() => {
      this.categoryCards.forEach((card, index) => {
        if (card.nativeElement) {
          card.nativeElement.setAttribute('data-card-id', index.toString());
          this.observer?.observe(card.nativeElement);
        }
      });
    }, 0);
  }

  isCardVisible(index: number): boolean {
    return this.visibleCards().has(index);
  }
}

