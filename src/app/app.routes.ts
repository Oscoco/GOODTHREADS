import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent),
    title: 'GoodThreads - Inicio'
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products-page/products-page.component').then(m => m.ProductsPageComponent),
    title: 'GoodThreads - Todos los productos'
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/components/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
    title: 'GoodThreads - Detalle del producto',
    data: { renderMode: 'client' }
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/components/cart.component').then(m => m.CartComponent),
    title: 'GoodThreads - Carrito',
    data: { renderMode: 'client' }
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/cart/components/checkout-card/checkout.component').then(m => m.CheckoutComponent),
    title: 'GoodThreads - Checkout',
    data: { renderMode: 'client' }
  },
  {
    path: 'thank-you',
    loadComponent: () => import('./pages/thank-you-page/thank-you-page.component').then(m => m.ThankYouPageComponent),
    title: 'GoodThreads - Gracias por tu Compra',
    data: { renderMode: 'client' }
  },
];
