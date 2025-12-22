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
    title: 'GoodThreads - Detalle del producto'
  },
];
