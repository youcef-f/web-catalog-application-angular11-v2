import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ActionEvent, AppDataState, ProductActionsTypes} from '../../../state/product.state';
import {Product} from '../../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  constructor() { }

  @Input() public itemProductInput: Product | null = null;
   @Output() productEventEmitterItemProduct: EventEmitter<ActionEvent> = new EventEmitter();

  ngOnInit(): void {
  }

  onSelect(prd: Product): void {
     this.productEventEmitterItemProduct.emit({type: ProductActionsTypes.SELECT_PRODUCT , PayloadParamFun: prd});
  }

  onDelete(prd: Product): void {
    this.productEventEmitterItemProduct.emit({type: ProductActionsTypes.DELETE_PRODUCT , PayloadParamFun: prd});

  }

  onEdit(prd: any): void {
    this.productEventEmitterItemProduct.emit({type: ProductActionsTypes.EDIT_PRODUCT , PayloadParamFun: prd});

  }
}
