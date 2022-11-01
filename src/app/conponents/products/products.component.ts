import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { productsService } from 'src/app/servicies/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //products?:Product[]; //---avec subscribe()
  products$?:Observable<AppDataState<Product[]>>;
  readonly DataStateEnum = DataStateEnum;
  keyword!:string;

  constructor(private productService:productsService, private router:Router) { }
 
  ngOnInit(): void {
    this.OngetAllProducts();
  }

  OngetAllProducts(){
    this.products$ = this.productService.getAllProducts()
      .pipe(
        map(data=>{ 
          console.log(typeof data[0].selected);
          return ({ dataState: DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }

/* //---getAllProducts avec subscribe
  OngetAllProducts(){
    this.productService.getAllProducts().subscribe(data=>{ 
      this.products = data;
    },err=>{ 
      console.error(err);
      
    });
  } */
  OngetSelectedProducts(){
    this.products$ = this.productService.getSelectedProducts()
      .pipe(
        map(data=>{ console.log(data);
         return ({ dataState: DataStateEnum.LOADED,data:data})}),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }
  OngetAvailableProducts(){
    this.products$ = this.productService.getAvailableProducts()
      .pipe(
        map(data=>{ console.log(data);
         return ({ dataState: DataStateEnum.LOADED,data:data})}),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
      );
  }
  
  onSearche() {
    this.products$ = this.productService.searcheProducts(this.keyword)
    .pipe(
      map(data=>{ console.log(data);
       return ({ dataState: DataStateEnum.LOADED,data:data})}),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
     
  onSelect(p:Product){
    this.productService.SelectProducts(p)
      .subscribe(data=>{p.selected = data.selected});
  }

  onDelete(p:Product){
    let v = confirm("Etes-vous sûr de vouloir supprimer ?");
    if(v==true)
    this.productService.DeleteProducts(p)
      .subscribe(()=>{
        this.OngetAllProducts();
      });
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct");
  }

  onEditeProduct(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
