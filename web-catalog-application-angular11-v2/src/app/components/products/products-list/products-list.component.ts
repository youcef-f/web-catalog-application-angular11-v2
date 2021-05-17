import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from '../../../state/product.state';
import {Product} from '../../../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() public listProductsInput$: Observable<AppDataState<Product[]>> | null = null;
   @Output() productEventEmitterListProduct: EventEmitter<ActionEvent> = new EventEmitter();

  public readonly dataStateEnum: typeof DataStateEnum = DataStateEnum;


  constructor() { }

  ngOnInit(): void {
  }

  /*
  onSelect(prd: Product): void{
     this.productEventEmitterListProduct.emit({type: ProductActionsTypes.SELECT_PRODUCT, PayloadParamFun: prd});
  }

  onDelete(prd: Product): void {
    this.productEventEmitterListProduct.emit({type: ProductActionsTypes.DELETE_PRODUCT, PayloadParamFun: prd});
  }

  onEdit(prd: Product): void{
    this.productEventEmitterListProduct.emit({type: ProductActionsTypes.EDIT_PRODUCT, PayloadParamFun: prd});
  }
*/



  onActionEvent($event: ActionEvent): void  {
    this.productEventEmitterListProduct.emit($event);
  }
}
