import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/interfaces';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  openModal: boolean = false;
  categoryName: string;
  parentCategoryId: number;
  subCategoryId: number;
  openSubModal: boolean = false;
  subcategoriesList: Category[];
  categoriesWithoutParent: Category[];
  isSubAvailable: boolean;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  loadCategories = () => {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.categoriesWithoutParent = this.categories.filter(
        (x) => x.parentCategoryId === null
      );
    });
  };

  filterCategories = () => {
    return this.categories.filter(
      (category) => category.parentCategoryId === null
    );
  };

  showModal = () => {
    this.categories.filter((x) => x.parentCategoryId === null);
    this.openSubModal = false;
    this.openModal = true;
  };
  openSubcategoryModal = (categoryId: number) => {
    this.openModal = false;
    this.loadSubCategories(categoryId);
    this.openSubModal = true;
  };

  loadSubCategories = (categoryId: number) => {
    this.subcategoriesList = this.categories.filter(
      (x) => x.parentCategoryId === categoryId
    );
  };

  onSubmit(): void {
    if (this.categoryName) {
      const categoryData: Category = {
        name: this.categoryName,
        parentCategoryId: this.parentCategoryId ? this.parentCategoryId : null,
      };
      console.warn(categoryData);

      this.categoryService.createCategory(categoryData).subscribe(
        (response) => {
          this.loadCategories();
          console.log('Category created successfully:', response);
          // Kategori başarıyla oluşturulduktan sonra bir işlem yapabilirsiniz, örneğin sayfayı yenileyebilirsiniz.
        },
        (error: Error) => {
          console.error('Error creating category:', error);
        }
      );
    }
  }

  onSelect(CategoryId: number) {
    if (CategoryId) {
      this.isSubAvailable = this.categories.some(
        (x) => x.parentCategoryId === CategoryId
      );

      this.isSubAvailable
        ? (this.subcategoriesList = this.categories.filter(
            (x) => x.parentCategoryId === CategoryId
          ))
        : (this.subcategoriesList = []);
    }
  }
}
