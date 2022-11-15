import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../model/product.model";

@Injectable({providedIn:"root"})
export class productsService {
    constructor(private http:HttpClient){ //---Dans ce constructeur on inject les service HttpClient
    }

    //---Get All Products
    getAllProducts():Observable<Product[]>{
        //let host = (Math.random()>0.5) ? environment.host: environment.unreachableHost;
        let host = environment.host;
        return this.http.get<Product[]>(host+'products');
    }

    //---Get All Products
    getSelectedProducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+'products?selected=true');
    }

    //---Get Available Products
    getAvailableProducts():Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+'products?available=true');
    }

    //---Get Seaech Products
    searcheProducts(keword:string):Observable<Product[]>{
        let host = environment.host;
        return this.http.get<Product[]>(host+'products?name_like='+keword);
    }

    //---Get Update Product
    SelectProducts(product:Product):Observable<Product>{
        let host    = environment.host;
        product.selected = !product.selected;
        return this.http.put<Product>(host+'products/'+product.id, product);
    }
    
    //---Get Seaech Products
    DeleteProducts(product:Product):Observable<void>{
        let host    = environment.host;
        return this.http.delete<void>(host+'products/'+product.id);
    }
    //---Get Save Product
    getProduct(id:number):Observable<Product>{
        let host    = environment.host;
        return this.http.get<Product>(host+'products/'+id);
    }  
    
    //---Get Save Product
    SaveProduct(product:Product):Observable<Product>{
        let host    = environment.host;
        return this.http.post<Product>(host+'products', product);
    }

    //---Get Save Product
    UpdateProduct(product:Product):Observable<Product>{
        let host    = environment.host;
        return this.http.put<Product>(host+'products/'+product.id, product);
    }
}