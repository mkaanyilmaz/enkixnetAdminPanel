import { Component, OnInit } from '@angular/core';
import { Category, Product } from 'src/app/interfaces/interfaces';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  openModel: boolean = false;
  categoryName: string = '';
  categoryId: number;
  parentCategoryId: number;
  categories: Category[] = [];
  product = new Product();
  selectedFiles: FileList | null = null;
  baseUrl = environment.apiUrl;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    console.log(environment.apiUrl);
    this.loadProducts();
  }

  loadProducts = () => {
    this.productService.getProductList().subscribe((data) => {
      this.products = data;
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

  onFileChanged(event: any): void {
    this.selectedFiles = event.target.files;
    console.warn(this.selectedFiles);
  }

  // onSubmit() fonksiyonu
  onSubmit(): void {
    const formData: FormData = new FormData();
    formData.append('productName', this.product.productName);
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    formData.append('categoryId', this.product.categoryId.toString());
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i]);
    }

    console.warn(formData);

    this.productService.createProduct(formData).subscribe(
      (response) => {
        this.openModel = false;
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

  addProduct = () => {};
}
