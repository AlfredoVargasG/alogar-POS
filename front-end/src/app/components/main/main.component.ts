import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule, NavbarComponent],
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isLoading = true;
  logoUrl: string = '';
  categories: any[] = [];
  filteredCategories: any[] = [];
  selectedCategory: any;
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getLogo();
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
}
