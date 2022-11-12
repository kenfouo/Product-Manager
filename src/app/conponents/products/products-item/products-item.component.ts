import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, ProductActionType } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {
  @Input() product!:Product;
  @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>()
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p:Product){
    this.eventEmitter.emit({type:ProductActionType.SELECT_PRODUCT, payload:this.product})
  }
  onDelete(p:Product){
    this.eventEmitter.emit({type:ProductActionType.DELETE_PRODUCT, payload:this.product})
  }
  onEditeProduct(p:Product){
    this.eventEmitter.emit({type:ProductActionType.EDIT_PRODUCT, payload:this.product})
  }
}
