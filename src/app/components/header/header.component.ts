import { Component, OnInit, HostListener, inject, PLATFORM_ID, } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser, DOCUMENT, ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private viewportScroller = inject(ViewportScroller);
  private lastScrollPosition = 0;
  
  isMobileMenuOpen = false;
  isSticky = false;
  hideTopBar = false;
  activeSubmenu: string | null = null;
  
  // Service submenu items
  serviceSubmenuItems = [
    { name: 'COLOUR ANODIZING', url: '/services/colour-anodizing' },
    { name: 'CHROME PLATING', url: '/services/chrome-plating' },
    { name: 'POWDER COATING', url: '/services/powder-coating' }
  ];

  constructor(private router: Router) {
    // Subscribe to router events and scroll to top on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    // Close mobile menu on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMobileMenu();
        this.closeAllSubmenus();
      }
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentScroll = window.scrollY;
      this.isSticky = currentScroll > 100;
      this.hideTopBar = currentScroll > 50 && currentScroll > this.lastScrollPosition;
      this.lastScrollPosition = currentScroll;
    }
  }

  toggleMobileMenu(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      this.document.body.classList.toggle('no-scroll', this.isMobileMenuOpen);
    }
  }

  closeMobileMenu(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileMenuOpen = false;
      this.document.body.classList.remove('no-scroll');
    }
  }
  
  toggleSubmenu(submenu: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    this.activeSubmenu = this.activeSubmenu === submenu ? null : submenu;
  }
  
  closeAllSubmenus(): void {
    this.activeSubmenu = null;
  }

  // Close mobile menu and submenus when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const target = event.target as HTMLElement;
    
    // Close mobile menu if clicked outside
    if (this.isMobileMenuOpen && 
        !target.closest('.mobile-nav') && 
        !target.closest('.menu-toggle')) {
      this.closeMobileMenu();
    }
    
    // Close submenu if clicked outside
    if (this.activeSubmenu && 
        !target.closest('.has-submenu') && 
        !target.closest('.submenu')) {
      this.closeAllSubmenus();
    }
  }
}
