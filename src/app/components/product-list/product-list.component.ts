import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    this.currentCategoryId = hasCategoryId
      ? Number(this.route.snapshot.paramMap.get('id'))
      : 1;

    this.productService
      .getProductList({ categoryId: this.currentCategoryId })
      .subscribe((data) => {
        this.products = data;
      });
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword') || '';
    this.productService.searchProducts(keyword).subscribe((data) => {
      this.products = data;
    });
  }
}
