import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { CategoriesIconsComponent } from '../categories-icons/categories-icons.component';
import { ProductsListComponent } from '../products-list/products-list.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, CategoriesIconsComponent, ProductsListComponent],
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  activeCategory = 'acompañamientos';
  isLoading: boolean = true;
  logo: string = '';

  constructor(private apiService: ApiService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.getCategories();
    this.getLogo();
  }

  getCategories() {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;
      this.getProducts();
      this.changeDetector.detectChanges();
    });
  }

  getProducts() {
    this.apiService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filterProducts(this.activeCategory);
      this.isLoading = false;
      this.changeDetector.detectChanges();
    })
  }

  getLogo() {
    this.apiService.getIcons().subscribe((data: any) => {
      this.logo = data.find((icon: any) => icon.url.includes('alogar-logo')).url;
    })
  }

  filterProducts(category: string) {
    this.filteredProducts = this.products.filter((product: any) => product.categories.includes(category));
    this.filteredProducts = this.filteredProducts.map((product: any) => {
      return {
        ...product,
        price: product.price.toString().length > 3 ? product.price.toString().slice(0, -3) + '.' + product.price.toString().slice(-3) : product.price
      }
    })
  }
}
