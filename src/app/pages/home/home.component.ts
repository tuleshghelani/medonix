import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import Aos from 'aos';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  currentSlide = 0;
  slides = [0, 1, 2, 3]; // Four slides for our main services
  showDesignContent = false;
  
  // Track active FAQ items
  activeFaqItem: number | null = 0; // First item is open by default
  
  // FAQ items (Surgitech-focused)
  faqItems = [
    {
      question: 'What types of surgical instruments does Medonix offer?',
      answer: 'We design and manufacture Surgitech products across General Surgery, Orthopedic, and ENT & Microsurgery, focusing on precision, safety, and clinician-centric ergonomics.'
    },
    {
      question: 'Are Medonix products compatible with common sterilization methods?',
      answer: 'Yes. Our instruments are manufactured with materials and finishes suitable for steam autoclave and ETO sterilization, following recommended cycles and IFU guidelines.'
    },
    {
      question: 'How do you ensure product quality and patient safety?',
      answer: 'We follow rigorous design controls, incoming and in-process inspections, and final functional checks. Each batch undergoes mechanical and visual QA before release.'
    },
    {
      question: 'Do you provide customization or OEM/white-label solutions?',
      answer: 'Absolutely. We tailor instruments, sets, and packaging to your specifications and can support OEM/white-label requirements with documentation and traceability.'
    },
    {
      question: 'What is the typical lead time for orders?',
      answer: 'Standard products ship in 2–4 weeks depending on quantities. Customized/OEM orders are scheduled after design freeze and validation; expedited options are available.'
    },
    {
      question: 'How can I request a catalogue or samples?',
      answer: 'Use the Get in Touch button or the Contact page to request our latest catalogue, product sheets, or evaluation samples for your specialty.'
    }
  ];
  
  services = [
    {
      title: 'General Surgery',
      description: 'Reliable instruments for general procedures, engineered for precision and ease of use.',
      icon: 'fa-stethoscope',
      benefits: ['Ergonomic grip', 'High-grade materials', 'Durable finish', 'Sterilization friendly']
    },
    {
      title: 'Orthopedic',
      description: 'Precision tools and sets for trauma and joint procedures with robust build quality.',
      icon: 'fa-bone',
      benefits: ['High strength', 'Secure locking', 'Workflow-optimized sets', 'Corrosion resistance']
    },
    {
      title: 'ENT & Microsurgery',
      description: 'Fine instruments for delicate procedures, offering excellent control and stability.',
      icon: 'fa-microscope',
      benefits: ['Fine tips', 'Balanced weight', 'Smooth actuation', 'Consistent performance']
    }
  ];
  
  testimonials = [
    {
      name: 'Rahul Sharma',
      company: '',
      comment: 'Medonix instruments are consistently reliable. Their ergonomic design has improved our intraoperative efficiency.',
      rating: 5
    },
    {
      name: 'Priyesh Patel',
      company: '',
      comment: 'Steady quality and responsive support. The kits are thoughtfully organized for our workflows.',
      rating: 5
    },
    {
      name: 'Vikram Singh',
      company: '',
      comment: 'Great balance of precision and durability. The team listens to clinical feedback and iterates quickly.',
      rating: 4
    }
  ];
  
  constructor(
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title
  ) {
    this.setupSEO();
    this.setupStructuredData();
  }

  private setupSEO() {
    this.title.setTitle('Medonix Surgitech Pvt Ltd | Advanced Surgical Instruments | Rajkot');
    this.meta.addTags([
      { name: 'description', content: 'Medonix Surgitech Pvt Ltd designs and manufactures premium surgical instruments and solutions engineered for precision, safety, and clinician-centric workflows.' },
      { name: 'keywords', content: 'Medonix Surgitech, surgical instruments, surgitech, operating room, orthopedic, ENT, microsurgery, Rajkot' },
      { property: 'og:title', content: 'Medonix Surgitech Pvt Ltd | Advanced Surgical Instruments' },
      { property: 'og:description', content: 'Reliable, clinician-centric products built for modern healthcare workflows.' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Medonix Surgitech Pvt Ltd' },
      { name: 'contact:email', content: 'marketing@medonixsurgitech.com' },
      { name: 'contact:phone_number', content: '+91 12345 67890' }
    ]);
  }

  private setupStructuredData() {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Medonix Surgitech Pvt Ltd',
      slogan: 'Innovating Surgical Care',
      description: 'High-quality Surgitech products designed for precision, safety and clinician‑centric workflows. Founded in 2025 and headquartered in Rajkot.',
      image: '/assets/logo/logo.png',
      priceRange: '₹',
      foundingDate: '2025',
      email: 'marketing@medonixsurgitech.com',
      telephone: '+91 12345 67890',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Office address to be updated',
        addressLocality: 'Rajkot',
        addressCountry: 'IN'
      },
      vatID: 'Under Process',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Surgitech Product Categories',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'General Surgery',
            description: 'Reliable instruments for general procedures'
          },
          {
            '@type': 'OfferCatalog',
            name: 'Orthopedic',
            description: 'Precision tools and sets for trauma and joint procedures'
          },
          {
            '@type': 'OfferCatalog',
            name: 'ENT & Microsurgery',
            description: 'Fine instruments for delicate procedures'
          }
        ]
      }
    };

    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      // Add FAQPage structured data for SEO
      const faqStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: this.faqItems.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      };
      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.text = JSON.stringify(faqStructuredData);
      document.head.appendChild(faqScript);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      Aos.init({
        duration: 1000,
        once: true
      });
      this.startSlideShow();
    }
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  private startSlideShow() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); 
  }
  
  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  toggleDesignContent() {
    this.showDesignContent = !this.showDesignContent;
  }
  
  // Toggle FAQ items
  toggleFaq(index: number) {
    this.activeFaqItem = this.activeFaqItem === index ? null : index;
  }
  
  // Check if a FAQ item is active
  isFaqActive(index: number): boolean {
    return this.activeFaqItem === index;
  }
}
