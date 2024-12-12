import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categories-icons',
  imports: [CommonModule],
  templateUrl: './categories-icons.component.html',
  styleUrl: './categories-icons.component.scss'
})
export class CategoriesIconsComponent {

  @Input() categories: any[] = [];
  @Input() isOpenCategories: boolean = false;
  icons: any[] = [];
  isLoading: boolean = true;
  icon: string = '';
  activeCategoryId = 1;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getIcons();
  }

  getIcons() {
    this.apiService.getIcons().subscribe((data: any) => {
      this.icons = data;
      this.categories = this.categories.map((category) => {
        return {
          ...category,
          nameIcon: category.name.replaceAll(' ', '-').replace('í','i').replace('á','a').replace('é','e').replace('ó','o').replace('ú','u').replace('ñ','n'),
        }
      })
      this.categories = this.categories.map((category) => {
        return {
          ...category,
          icon: this.icons.find((icon) => icon.url.includes(category.nameIcon)).url
        }
      })
      this.isLoading = false;
    })
  }

  changeActiveCategory(categoryId: number) {
    this.activeCategoryId = categoryId;
  }
}
