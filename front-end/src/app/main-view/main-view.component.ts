import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  isLoading: boolean = true;

  constructor(private apiService: ApiService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;
      this.changeDetector.detectChanges();
    });
  }

  changeHeightCategories() {
    this.isOpenCategories = !this.isOpenCategories;
  }
}
