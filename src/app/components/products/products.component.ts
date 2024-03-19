import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Product } from 'src/app/interfaces/interfaces';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  openModel: boolean = false;
  productForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    productPrice: new FormControl('', Validators.required),
    productDescription: new FormControl('', Validators.required),
  });
  categoryName: string = '';
  categoryId: number;
  parentCategoryId: number;
  categories: Category[] = [];
  product: Product = {
    productName: '',
    price: 0,
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {}

  loadProducts = () => {
    this.productService.getProductList().subscribe((data) => {
      this.products = data;
      console.warn(data);
    });
  };

  showModal = () => {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.openModel = true;
  };

  onSelect(event: number) {
    console.log(event);
  }

  onSubmit(): void {
    const newProduct: Product = {
      productName: this.product.productName,
      price: this.product.price,
      description: this.product.description,
      categoryId: this.categoryId,
    };

    this.productService.createProduct(newProduct).subscribe(
      (response) => {
        this.loadProducts();
        console.log('Product created successfully:', response);
        // Burada eklenen ürün hakkında kullanıcıya bir geri bildirim sağlayabilirsiniz
      },
      (error) => {
        console.error('Error occurred while creating product:', error);
        // Hata durumunda kullanıcıya uygun bir hata mesajı gösterebilirsiniz
      }
    );
  }

  addProduct = () => {
    // this.productService.addProduct(this.productForm.value).subscribe((data) => {
    //   this.loadProducts(null);
    //   this.openModel = false;
    // });
  };
}
