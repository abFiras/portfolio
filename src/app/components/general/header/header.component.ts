import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, query, transition, stagger, animate } from '@angular/animations';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { LanguageService, SupportedLang } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('animateMenu', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: 'translateY(-50%)' }),
          stagger(50, [
            animate('250ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  standalone: false
})
export class HeaderComponent implements OnInit {

  responsiveMenuVisible = false;
  langOpen = false;
  pageYPosition = 0;

  readonly langs: { code: SupportedLang; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'de', label: 'DE', flag: '🇩🇪' },
  ];

  constructor(
    private router: Router,
    public analyticsService: AnalyticsService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {}

  get currentLang() {
    return this.langs.find(l => l.code === this.languageService.language) || this.langs[0];
  }

  switchLang(code: SupportedLang): void {
    this.languageService.changeLanguage(code);
    this.analyticsService.sendAnalyticEvent('change_language', 'header', code);
  }

  scroll(el: string): void {
    this.responsiveMenuVisible = false;
  this.langOpen = false;
    const target = document.getElementById(el);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/home']).then(() => {
        document.getElementById(el)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  downloadCV(): void {
  this.languageService.translateService.get('Header.cvName').subscribe(val => {
    window.open(val, '_blank');
  });
}

  @HostListener('window:scroll')
  onScroll(): void {
    this.pageYPosition = window.pageYOffset;
  }
}
