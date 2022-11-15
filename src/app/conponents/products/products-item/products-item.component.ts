import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ActionEvent, AppDataState, ProductActionType } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {
  @Input() product!:Product;
  // @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>()
  constructor(
    private eventDriveService: EventDriverService
  ) { }

  ngOnInit(): void {
  }

  onSelect(p:Product){  
    this.eventDriveService.publishEvent({type:ProductActionType.SELECT_PRODUCT, payload:this.product});
    //this.eventEmitter.emit({type:ProductActionType.SELECT_PRODUCT, payload:this.product})
  }
  onDelete(p:Product){
    this.eventDriveService.publishEvent({type:ProductActionType.DELETE_PRODUCT, payload:this.product});
    //this.eventEmitter.emit({type:ProductActionType.DELETE_PRODUCT, payload:this.product})
  }
  onEditeProduct(p:Product){
    this.eventDriveService.publishEvent({type:ProductActionType.EDIT_PRODUCT, payload:this.product});
    //this.eventEmitter.emit({type:ProductActionType.EDIT_PRODUCT, payload:this.product})
  }
}
