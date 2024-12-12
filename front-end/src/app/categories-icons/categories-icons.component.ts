import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categories-icons',
  imports: [CommonModule],
  templateUrl: './categories-icons.component.html',
  styleUrl: './categories-icons.component.scss'
})
export class CategoriesIconsComponent {

  @Input() category: string = '';
  icon: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getIcons();
  }

  getIcons() {
    this.apiService.getIcons(this.category
    .replaceAll(' ', '-')
    .replaceAll('ñ', 'n').replaceAll('í', 'i')).subscribe((data: any) => {
      this.icon = data;
    });
  }
}
