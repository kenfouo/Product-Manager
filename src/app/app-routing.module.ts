import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductEditComponent } from './conponents/product-edit/product-edit.component';
import { HomeComponent } from './conponents/home/home.component';
import { ProductAddComponent } from './conponents/product-add/product-add.component';
import { ProductsComponent } from './conponents/products/products.component';

const routes: Routes = [
  {path:'products', component:ProductsComponent},
  {path:'Home', component:HomeComponent},
  {path:'newProduct', component:ProductAddComponent},
  {path:'editProduct/:id', component:ProductEditComponent},
  {path:'', component:HomeComponent},
  // {path:'',redirectTo: 'Home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
