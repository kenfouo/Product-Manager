import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionType } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  DataStateEnum = DataStateEnum;
  @Input() productsInput$?:Observable<AppDataState<Product[]>>;
  @Output() productEventEmitter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>()

  constructor() { }

  ngOnInit(): void {
  }
  
onSelect(p:Product){
  this.productEventEmitter.emit({type:ProductActionType.SELECT_PRODUCT, payload:p});
}
onDelete(p:Product){
  this.productEventEmitter.emit({type:ProductActionType.DELETE_PRODUCT, payload:p});
}
onEditeProduct(p:Product){
  this.productEventEmitter.emit({type:ProductActionType.EDIT_PRODUCT, payload:p});
}
OnactionEvent($event:ActionEvent){
  this.productEventEmitter.emit($event)
}
}
