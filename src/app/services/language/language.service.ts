import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

export type SupportedLang = 'en' | 'fr' | 'es' | 'de';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: SupportedLang = 'en';
  readonly supportedLangs: SupportedLang[] = ['en', 'fr', 'es', 'de'];

  constructor(
    public translateService: TranslateService,
    private location: Location
  ) {}

  initLanguage(): void {
    this.translateService.addLangs(this.supportedLangs);
    this.translateService.setDefaultLang('en');

    // Only use URL path lang if explicitly set, otherwise always default to English
    const pathLang = this.getLangFromPath();
    const chosen: SupportedLang = this.isSupported(pathLang) ? pathLang : 'en';

    this.translateService.use(chosen);
    this.language = chosen;

    if (!pathLang) {
      this.location.go('en');
    }
  }

  changeLanguage(lang: SupportedLang): void {
    if (!this.isSupported(lang)) return;
    this.language = lang;
    // Reload the page with the new language in the URL — cleanest solution
    window.location.href = '/' + lang;
  }

  private getLangFromPath(): SupportedLang | null {
    const segments = window.location.pathname.replace(/^\//, '').split('/');
    const first = segments[0] as SupportedLang;
    return this.isSupported(first) ? first : null;
  }

  private isSupported(lang: string): lang is SupportedLang {
    return this.supportedLangs.includes(lang as SupportedLang);
  }
}
