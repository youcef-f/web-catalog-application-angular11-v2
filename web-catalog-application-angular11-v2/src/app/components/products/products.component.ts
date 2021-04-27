import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from '../../state/product.state';
import {Router} from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  /* public products: Product[] | undefined; */
  /*public products: Product[] | null = null;*/
  /*public products$: Observable<Product[]> | null = null ;*/

  public products$: Observable<AppDataState<Product[]>> | null = null;
  public readonly dataStateEnum: typeof DataStateEnum = DataStateEnum;

  constructor(private productsservice: ProductsService,private router: Router) {
  }

  ngOnInit(): void {
  }



  onGetAllProducts(): void {
    /* Methode 1 pour reuperer les données */
    /*this.productsservice.getAllProducts().subscribe(data => {this.products = data; }, error => {console.log(error); });*/

    // Methode 2 pour recuperer les données
    this.products$ = this.productsservice.getAllProducts().pipe(
      map((data) => {
        console.log(data);
        return ({ myData: data, dataState: DataStateEnum.LOADED})}),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})) );
  }


  onGetAllProducts2() {
    /* Methode 1 pour reuperer les données */
    /*this.productsservice.getAllProducts().subscribe(data => {this.products = data; }, error => {console.log(error); });*/

    // Methode 2 pour recuperer les données
    this.products$ = this.productsservice.getAllProducts().pipe(
      map((data) => ({ myData: data, dataState: DataStateEnum.LOADED})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})) );
  }

  onGetSelectedProducts() {
    this.products$ = this.productsservice.getSelectedProducts().pipe(
      map((data) => ({ myData: data, dataState: DataStateEnum.LOADED})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})) );

  }

  onGetAvailableProducts() {
    this.products$ = this.productsservice.getAvailableProducts().pipe(
      map((data) => ({ myData: data, dataState: DataStateEnum.LOADED})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message})) );

  }

  onSearch(formsSearch: any) {
    this.products$ = this.productsservice.getSearchProducts(formsSearch.InputKeyword).pipe(
      map((data) => ({ myData: data, dataState: DataStateEnum.LOADED})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({ errorMessage: err.message, dataState: DataStateEnum.ERROR })) );
  }

  onSelect(product: Product ) {
    this.productsservice.selectProducts(product).subscribe(data=>{
      product.selected=data.selected;
    });
  }

/*
  onSelect1(product: Product ) {

    this.products$ = this.productsservice.selectProducts(product).pipe(
      map((data) => ({ myData: data, dataState: DataStateEnum.LOADED})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({ errorMessage: err.message, dataState: DataStateEnum.ERROR })) );
  }
*/

  onDelete(product: Product) {
    let v = confirm("Etes vous sûre de vouloir supprimer l'enregistrement ?")
    if (v != true) {
      return;
    }
    this.productsservice.deleteProduct(product).subscribe(data => {
      this.onGetAllProducts();
    });
  }


  onNewProducts() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(prd: Product) {
    this.router.navigateByUrl("/editProduct/" + prd.id);

  }
}
