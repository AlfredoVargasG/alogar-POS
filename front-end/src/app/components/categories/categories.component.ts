import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  @Input() categories: any[] = [];
  @Input() selectedCategory: any = '';

  @Output() selectCategory = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  changeCategory(category: string) {
    this.selectCategory.emit(category);
  }
}
