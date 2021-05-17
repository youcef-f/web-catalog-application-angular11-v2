import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {

  }


  getAllProducts(): Observable<Product[]>{
    let host: string;
    host = ( Math.random() < 0.8) ? environment.host : environment.unreachable;
    return this.http.get<Product[]>(host + '/produits');
  }

  getSelectedProducts(): Observable<Product[]>{
    let host: string;
    host = ( Math.random() < 0.8) ? environment.host : environment.unreachable;
    return this.http.get<Product[]>(host + '/produits?selected=true');
  }

  getAvailableProducts(): Observable<Product[]> {
    let host: string;
    host = ( Math.random() < 0.8) ? environment.host : environment.unreachable;
    return this.http.get<Product[]> (host + '/produits?available=true');
  }

  getSearchProducts(keyWord: string) : Observable<Product[]>  {
    let host: string;
    host = environment.host;
    return this.http.get<Product[]> (host + '/produits?name_like=' + keyWord);
  }

  selectProducts (product: Product): Observable<Product> {
    let host: string;
    host = environment.host;
    product.selected = !product.selected;
    return this.http.put<Product>(host + '/produits/' + product.id, product);
  }


  deleteProduct(product: Product): Observable<void>  {
    let host: string;
    host = environment.host;
    product.selected = !product.selected;
    return this.http.delete<void>(host + '/produits/' + product.id);
  }

  saveProduct(product: Product): Observable<Product> {
     let host: string;
     host = environment.host;
     return this.http.post<Product>(host + '/produits', product);
  }

  getProduct(idProduct: number ): Observable<Product> {
    let host: string;
    host = environment.host;
    return this.http.get<Product> (host + '/produits/' + idProduct);
  }

  updateProducts(product: Product): Observable<Product> {
    let host: string;
    host = environment.host;
    return this.http.put<Product> (host + '/produits/' + product.id, product);
  }

}
