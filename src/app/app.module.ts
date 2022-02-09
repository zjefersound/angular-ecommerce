import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import {
  RiHome2Fill,
  RemixIconModule,
  RiShoppingCartLine,
} from 'angular-remix-icon';
import { Routes, RouterModule } from '@angular/router';

// Configure the required icons before hand
const icons = {
  RiHome2Fill,
  RiShoppingCartLine,
};

const routes: Routes = [
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: "/products", pathMatch: 'full' },
  { path: '**', redirectTo: "/products", pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, ProductListComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    RemixIconModule.configure(icons),
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
