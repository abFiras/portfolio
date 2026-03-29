import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LanguageService } from './services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'portfolio';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Init language FIRST — before any child component tries to translate
    this.languageService.initLanguage();
  }

  ngAfterViewInit(): void {
    this.initLoader();
    this.initCursor();
    setTimeout(() => this.initScrollReveal(), 400);
  }

  private initLoader(): void {
    const done = () => {
      const loader = document.getElementById('page-loader');
      if (loader) loader.classList.add('loaded');
    };
    if (document.readyState === 'complete') {
      setTimeout(done, 3200);
    } else {
      window.addEventListener('load', () => setTimeout(done, 3200));
    }
    setTimeout(done, 5200); // hard fallback
  }

  private initCursor(): void {
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let rx = 0, ry = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
      cx = e.clientX; cy = e.clientY;
      dot.style.left = cx + 'px';
      dot.style.top  = cy + 'px';
    });

    const animRing = () => {
      rx += (cx - rx) * 0.1;
      ry += (cy - ry) * 0.1;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    };
    animRing();

    setTimeout(() => {
      document.querySelectorAll(
        'a, button, .main-btn, .skill-chip, .job-tab-btn, .project-card, .more-card, .nav-logo, .contact-cta-btn'
      ).forEach(el => {
        el.addEventListener('mouseenter', () => { dot.classList.add('hover');  ring.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
      });
    }, 600);
  }

  private initScrollReveal(): void {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('sr-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.sr, .sr-left, .sr-right, .sr-scale').forEach(el => obs.observe(el));
  }
}
