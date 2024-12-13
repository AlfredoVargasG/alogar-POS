import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule, NavbarComponent, CategoriesComponent],
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isLoading = true;
  logoUrl: string = '';
  categories: any[] = [];
  filteredCategories: any[] = [];

  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getLogo();
    this.getCategories();
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
      this.isLoading = false;
    }, 2000)
  }

  getLogo() {
    this.apiService.getIcons('logo').subscribe((data: any) => {
      this.logoUrl = data.find((icon: any) => icon.url.includes('alogar-logo')).url;
    })
  }

  getCategories() {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.getCategoriesIcons();
    })
  }

  getCategoriesIcons() {
    this.apiService.getIcons('images').subscribe((data: any) => {
      this.filteredCategories = this.categories.map((category: any) => {
        const icon = data.find((icon: any) => icon.url.includes(category.url.split('/')[4]));
        return {
          ...category,
          icon: icon ? icon.url : ''
        }
      })
    })
  }
}
