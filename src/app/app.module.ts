import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './conponents/home/home.component';
import { NavBarComponent } from './conponents/nav-bar/nav-bar.component';
import { ProductsComponent } from './conponents/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductAddComponent } from './conponents/product-add/product-add.component';
import { ProductEditComponent } from './conponents/product-edit/product-edit.component';
import { ProductsNavBarComponent } from './conponents/products/products-nav-bar/products-nav-bar.component';
import { ProductsListComponent } from './conponents/products/products-list/products-list.component';
import { ProductsItemComponent } from './conponents/products/products-item/products-item.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    HomeComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductsNavBarComponent,
    ProductsListComponent,
    ProductsItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   //---Ici on impoerte le service HttpClientModule, il sera au rouge jusqu'a ce qu'on ajoute l'import:import { HttpClientModule } from '@angular/common/http';
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
