import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import {
  RiAncientGateFill,
  RiHome2Fill,
  RemixIconModule,
  RiShoppingCartLine
} from 'angular-remix-icon';

// Configure the required icons before hand
const icons = {
  RiAncientGateFill,
  RiHome2Fill,
  RiShoppingCartLine
};
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RemixIconModule.configure(icons),
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
