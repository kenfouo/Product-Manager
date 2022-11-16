import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControlName} from '@angular/forms';
import { productsService } from 'src/app/servicies/products.service';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { AppDataState, ProductActionType } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup?: FormGroup;
  submited:boolean=false;

  constructor(
    private fb:FormBuilder, 
    private productService:productsService,
    private eventDriverService:EventDriverService,
    private _location: Location
    ) { }

  ngOnInit(): void { 
    this.productFormGroup = this.fb.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],
    })
  }
  onSaveProducts(){ 
    this.submited = true;
    if(this.productFormGroup?.invalid)return;
    this.productService.SaveProduct(this.productFormGroup?.value).
    subscribe(data=>{
        this.eventDriverService.publishEvent({type:ProductActionType.PRODUCT_ADDED})
        this._location.back();
      })
  }

  // Getter method to access formcontrols
  get productForm() {
    return this.productFormGroup?.controls;
  }
}
