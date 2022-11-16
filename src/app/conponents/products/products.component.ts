import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { productsService } from 'src/app/servicies/products.service';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionType } from 'src/app/state/product.state';

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

  constructor(
              private productService:productsService, 
              private router:Router,
              private eventDriverService: EventDriverService
              ) { }
 
  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    })
    this.OngetAllProducts();
  }

  OngetAllProducts(){
    this.products$ = this.productService.getAllProducts()
      .pipe(
        map(data=>{ 
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
  
  OnSearch(keyword:any) {
    this.products$ = this.productService.searcheProducts(keyword)
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
    console.log(' p',p);
    
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionType.GET_ALL_PRODUCTS:this.OngetAllProducts();break;
      case ProductActionType.GET_SELECTED_PRODUCTS:this.OngetSelectedProducts();break;
      case ProductActionType.GET_AVAILABLE_PRODUCTS:this.OngetAvailableProducts();break;
      case ProductActionType.NEW_PRODUCTS:this.onNewProduct();break;
      case ProductActionType.SEARCH_PRODUCTS:this.OnSearch($event.payload);break;
      case ProductActionType.DELETE_PRODUCT:this.onDelete($event.payload);break;
      case ProductActionType.SELECT_PRODUCT:this.onSelect($event.payload);break;
      case ProductActionType.EDIT_PRODUCT:this.onEditeProduct($event.payload);break;
    
      default:
        break;
    }
    //throw new Error('Method not implemented.');
  }
}
