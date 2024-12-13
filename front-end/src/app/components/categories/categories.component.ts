import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

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

  @ViewChild('scrollList') scrollList!: ElementRef;

  @Output() selectCategory = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  changeCategory(category: string) {
    this.selectCategory.emit(category);
  }

  scrollCategoriesList(direction: string) {
    const scrollAmount = 80;
    const scrollOptions = {
      top: direction === 'up' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    };
    this.scrollList.nativeElement.scrollBy(scrollOptions);
  }
}
