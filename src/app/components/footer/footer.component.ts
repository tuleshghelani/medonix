import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  
  // Track which product categories are expanded
  expandedCategories: { [key: string]: boolean } = {};

  toggleCategory(categoryKey: string): void {
    this.expandedCategories[categoryKey] = !this.expandedCategories[categoryKey];
  }

  isCategoryExpanded(categoryKey: string): boolean {
    return this.expandedCategories[categoryKey] || false;
  }
}
