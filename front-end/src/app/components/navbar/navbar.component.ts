import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() logoUrl: string = '';
  menuOpen: boolean = true; // Estado inicial del menú
  menuItems = [
    { label: 'Agregar', icon: 'add' },
    { label: 'Productos', icon: 'shopping_cart' },
    { label: 'Ventas', icon: 'receipt' },
    { label: 'Proveedores', icon: 'inventory' },
    { label: 'Clientes', icon: 'people' },
  ];

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Alterna entre abierto y cerrado
  }
}
