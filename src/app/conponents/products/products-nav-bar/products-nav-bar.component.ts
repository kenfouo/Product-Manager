import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ProductActionType } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {
  keyword?:string;
  // @Output() productEventEmitter : EventEmitter<any> = new EventEmitter();
  constructor(
    private eventDriverService: EventDriverService
  ) { }

  ngOnInit(): void {
  }
  onNewProduct() {
    this.eventDriverService.publishEvent({type:ProductActionType.NEW_PRODUCTS, payload:null});
    // this.productEventEmitter.emit({type:ProductActionType.NEW_PRODUCTS, payload:null});
    //throw new Error('Method not implemented.');
  }
  OngetAvailableProducts() {
    this.eventDriverService.publishEvent({type:ProductActionType.GET_AVAILABLE_PRODUCTS, payload:null});
    //this.productEventEmitter.emit({type:ProductActionType.GET_AVAILABLE_PRODUCTS, payload:null});
    //throw new Error('Method not implemented.');
  }

  OngetSelectedProducts() {
    this.eventDriverService.publishEvent({type:ProductActionType.GET_SELECTED_PRODUCTS, payload:null});
    // this.productEventEmitter.emit({type:ProductActionType.GET_SELECTED_PRODUCTS, payload:null});
    //throw new Error('Method not implemented.');
  }

  OngetAllProducts() {
    this.eventDriverService.publishEvent({type:ProductActionType.GET_ALL_PRODUCTS, payload:null});
    //this.productEventEmitter.emit({type:ProductActionType.GET_ALL_PRODUCTS, payload:null});
    //throw new Error('Method not implemented.');
  }

  onSearche() {
    this.eventDriverService.publishEvent({type:ProductActionType.SEARCH_PRODUCTS, payload: this.keyword});
    // this.productEventEmitter.emit({type:ProductActionType.SEARCH_PRODUCTS, payload: this.keyword});
    //throw new Error('Method not implemented.');
  }
}
