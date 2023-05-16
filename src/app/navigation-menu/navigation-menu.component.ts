import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  template: `
  <mat-nav-list>
    <h3 matSubheader>Manager</h3>
    <a mat-list-item
    routerLinkActive="active-link"
    routerLink="/manager/users">
      Users
    </a>
    <a mat-list-item
    routerLinkActive="active-link"
    routerLink="/manager/receipts">
      Receipts
    </a>
    <h3 matSubheader>Inventory</h3>
    <a mat-list-item
    routerLinkActive="active-link"
    routerLink="/inventory/stockEntry">
      Stock Entry
    </a>
    <a mat-list-item
    routerLinkActive="active-link"
    routerLink="/inventory/products">
      Products
    </a>
    <a mat-list-item
    routerLinkActive="active-link"
    routerLink="/inventory/categories">
      Categories
    </a>
    <h3 matSubheader>Clerk</h3>
    <a mat-list-item
    routerLinkActive="active-link"
    routerLink="/pos">
      POS
    </a>
  </mat-nav-list>
  `,
  styles: [
  ]
})
export class NavigationMenuComponent {

}