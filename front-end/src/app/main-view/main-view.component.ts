import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { CategoriesIconsComponent } from '../categories-icons/categories-icons.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, CategoriesIconsComponent],
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  isOpenCategories = false;
  activeCategoryId = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  changeActiveCategory(categoryId: number) {
    this.activeCategoryId = categoryId;
  }

  changeHeightCategories() {
    this.isOpenCategories = !this.isOpenCategories;
  }
}
