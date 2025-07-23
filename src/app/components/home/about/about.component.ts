import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-in', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms ease-out', style({ opacity: 0 }))
            ])
        ]),
        trigger('zoomIn', [
            transition(':enter', [
                style({ transform: 'scale(0.3)', opacity: 0 }),
                animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'scale(1)', opacity: 1 }))
            ])
        ]),
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('600ms ease-in', style({ opacity: 1 }))
            ])
        ])
    ],
    standalone: false
})
export class AboutComponent implements OnInit, AfterViewInit {

  isImageModalOpen = false;
  
  // Personal information
  personalInfo = {
    name: 'Firas Abdallah',
    title: 'Full-Stack Developer & DevOps Engineer',
    location: 'El Ghazela, Ariana, Tunisia',
    email: 'abdallah.firas@outlook.fr',
    phone: '+216 93 637 575',
    linkedin: 'firas-abdallah',
    github: 'abFiras'
  };

  // About paragraphs
  aboutParagraphs = [
    `Hello! I'm <strong>Firas Abdallah</strong>, a freshly graduated software engineering student with hands-on experience in full-stack development and DevOps through internships and academic projects.`,
    `I'm skilled in <strong>Spring Boot, Angular, Python, microservices architecture, CI/CD, Docker, Kubernetes</strong>, and Infrastructure as Code. I'm motivated by automation, learning, and building efficient development pipelines.`,
    `Currently working on <strong>HiveMind Academy</strong>, an e-learning microservices platform with complete DevOps pipeline implementation, and passionate about creating scalable, robust applications.`
  ];

  // Skills array
  skills = [
    'Spring Boot',
    'Angular',
    'Python',
    'Docker & Kubernetes',
    'Jenkins & GitLab CI/CD',
    'AWS & Terraform',
    'MySQL & PostgreSQL',
    'Microservices Architecture'
  ];

  constructor(
    public analyticsService: AnalyticsService,
    private animationsService: AnimationsService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    // Initialize component data if needed
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  onImageClick(): void {
    this.analyticsService.sendAnalyticEvent("click_image", "about", "firas_profile_image");
    this.openImageModal();
  }

  openImageModal(): void {
    this.isImageModalOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent body scroll
  }

  closeImageModal(): void {
    this.isImageModalOpen = false;
    document.body.style.overflow = 'auto'; // Restore body scroll
  }

  onModalBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeImageModal();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeImageModal();
    }
  }

  private initAnimations(): void {
    const aboutSection = this.elementRef.nativeElement;

    // Animate title
    const title = aboutSection.querySelector('.about-title');
    if (title) {
      this.animationsService.observeElement(title, {
        type: 'slideInUp',
        duration: 1000
      });
    }

    // Animate paragraphs with stagger
    const paragraphs = aboutSection.querySelectorAll('.about-description p');
    paragraphs.forEach((p: HTMLElement, index: number) => {
      this.animationsService.observeElement(p, {
        type: 'fadeInLeft',
        duration: 800,
        delay: 200 + (index * 300)
      });
    });

    // Animate skills section title
    const skillsTitle = aboutSection.querySelector('.skills-section-title');
    if (skillsTitle) {
      this.animationsService.observeElement(skillsTitle as HTMLElement, {
        type: 'fadeInLeft',
        delay: 1100
      });
    }

    // Animate skills list
    const skillsList = aboutSection.querySelector('.skills-list');
    if (skillsList) {
      this.animationsService.observeElement(skillsList as HTMLElement, {
        type: 'fadeInUp',
        delay: 1200
      });
    }

    // Animate individual skills with stagger
    const skills = aboutSection.querySelectorAll('.skill-element');
    skills.forEach((skill: HTMLElement, index: number) => {
      this.animationsService.observeElement(skill, {
        type: 'scaleIn',
        delay: 1300 + (index * 100)
      });

      // Add hover effects
      this.animationsService.addHoverEffects(skill, ['lift', 'glow']);
    });

    // Animate image
    const imageContainer = aboutSection.querySelector('.about-img-container');
    if (imageContainer) {
      this.animationsService.observeElement(imageContainer as HTMLElement, {
        type: 'morphIn',
        duration: 1200,
        delay: 600
      });
    }
  }

  // Additional methods for potential future use
  downloadCV(): void {
    this.analyticsService.sendAnalyticEvent("download_cv", "about", "firas_cv");
    // Implement CV download logic here
  }

  contactMe(): void {
    this.analyticsService.sendAnalyticEvent("contact_click", "about", "contact_button");
    // Implement contact logic here
  }
}