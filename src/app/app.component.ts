import { Component, OnInit, OnDestroy } from '@angular/core';
import Lenis from 'lenis';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import {LanguageService} from "src/app/services/language/language.service"
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ParticlesService } from './services/particles/particles.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Firas-Abdallah-portfolio';
  private lenis: Lenis;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translateService: TranslateService,
    private location: Location,
    private languageService: LanguageService,
    private particlesService: ParticlesService
    ){
    }
  ngOnInit(): void{

    this.languageService.initLanguage()

    this.titleService.setTitle( "Firas Abdallah" );

    this.metaService.addTags([
      {name: 'keywords', content: 'software, developer'},
      {name: 'description', content: 'Recién graduado en Ingeniería de Software, con experiencia práctica en desarrollo full-stack y DevOps a través de proyectos académicos y prácticas. Me apasiona proponer y ejecutar ideas, escribir y refactorizar código limpio, reutilizable y escalable, y aprender constantemente para aportar soluciones tecnológicas que mejoren la web.'},
    ]);

    // Inicializar Lenis para smooth scrolling
    this.initLenis();

    // Inicializar partículas globales después de un breve delay
    setTimeout(() => {
      this.particlesService.init();
    }, 100);
  }

  private initLenis(): void {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false
    });

    // Función de animación
    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  ngOnDestroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
    }

    // Destruir partículas
    this.particlesService.destroy();
  }

}
