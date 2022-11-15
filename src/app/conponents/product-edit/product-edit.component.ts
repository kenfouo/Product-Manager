import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { productsService } from 'src/app/servicies/products.service';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ProductActionType } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId:number;
  submited?:boolean;
  productFormGroup?:FormGroup;

  constructor(private activatedRoute:ActivatedRoute,
              private productService:productsService, 
              private fb:FormBuilder,
              private eventDriverService:EventDriverService
              ) { 

    this.productId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId)
      .subscribe(product => {
        this.productFormGroup = this.fb.group({
          id:[product.id,Validators.required],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.selected,Validators.required],
          available:[product.available,Validators.required],
        });
      });
  }
  onUpdateProduct(){
    this.productService.UpdateProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        this.eventDriverService.publishEvent({type:ProductActionType.PRODUCT_UPDATED})
        alert('Success');
      })
  }
}
