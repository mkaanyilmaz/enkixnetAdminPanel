import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-fw pi-file',
        routerLink: '/products',
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
      },
    ];
  }
}
