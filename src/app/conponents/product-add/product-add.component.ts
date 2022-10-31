import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControlName} from '@angular/forms';
import { productsService } from 'src/app/servicies/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup?: FormGroup;
  submited:boolean=false;
  constructor(private fb:FormBuilder, private productService:productsService) { }

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
    this.submited=true;
    if(this.productFormGroup?.invalid)return;

    this.productService.SaveProduct(this.productFormGroup?.value).
      subscribe(data=>{
        alert("success");
      })
  }
  // Getter method to access formcontrols
  get productForm() {
    return this.productFormGroup?.controls;
  }
}
