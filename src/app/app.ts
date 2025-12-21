import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/components/footer/footer';
import { Descuentos } from './shared/components/descuentos/descuentos';
import { Hero } from './features/hero/hero';
import { MenuBar } from './shared/components/menu-bar/menu-bar';
import { FeaturedProducts } from './features/featured-products/featured-products';
import { ProductCategories } from './features/product-categories/product-categories';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Descuentos, Hero, MenuBar, FeaturedProducts, ProductCategories],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('good-threads');
}
