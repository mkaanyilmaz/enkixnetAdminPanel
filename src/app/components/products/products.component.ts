import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  loadProducts = (event: any) => {
    this.productService.getProductList().subscribe((data) => {
      this.products = data;
      console.warn(data);
    });
  };
}
