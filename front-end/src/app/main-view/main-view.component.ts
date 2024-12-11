import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  isOpenCategories = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  changeHeightCategories() {
    this.isOpenCategories = !this.isOpenCategories;
  }
}
