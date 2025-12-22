import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly dataPath = '/assets/data/products.json';

  /**
   * Obtiene todos los productos desde el archivo JSON local
   * @returns
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataPath);
  }

  /**
   * Obtiene un producto por su ID
   * @param id
   @returns
   */
  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.dataPath).pipe(
      map(products => products.find(product => product.id === id))
    );
  }

  /**
   * Obtiene productos filtrados por categoría
   * @param category
   * @returns
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataPath).pipe(
      map(products => products.filter(product => product.category === category))
    );
  }
}

