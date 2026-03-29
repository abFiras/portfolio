import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: false
})
export class BannerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('particlesCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('bannerSubtitle') subtitleRef!: ElementRef;

  liveTime = '';
  private timeouts: number[] = [];
  private intervals: any[] = [];
  private animFrame!: number;
  private particles: any[] = [];

  constructor(
    public analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateTime();
    this.intervals.push(setInterval(() => { this.updateTime(); this.cdr.detectChanges(); }, 1000));
  }

  ngAfterViewInit(): void {
    this.timeouts.push(window.setTimeout(() => this.initTypewriter(), 2700));
    this.timeouts.push(window.setTimeout(() => this.initParticles(), 600));
  }

  private updateTime(): void {
    const now = new Date();
    this.liveTime = now.toLocaleTimeString('en-US', {
      timeZone: 'Africa/Tunis',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    }) + ' GMT+1';
  }

  private initTypewriter(): void {
    const el = this.subtitleRef?.nativeElement as HTMLElement;
    if (!el) return;
    const typed = el.querySelector('.typed-text') as HTMLElement;
    if (!typed) return;
    const text = 'Full-Stack Developer & DevOps Engineer';
    let i = 0;
    const tick = setInterval(() => {
      typed.textContent = text.slice(0, ++i);
      if (i >= text.length) clearInterval(tick);
    }, 52);
    this.intervals.push(tick);
  }

  private initParticles(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 55; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.35 + 0.1,
        color: Math.random() > 0.65 ? '200,169,110' : '100,255,218'
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        // Connection lines
        for (let j = i + 1; j < this.particles.length; j++) {
          const q = this.particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(100,255,218,${0.055 * (1 - d / 110)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      this.animFrame = requestAnimationFrame(draw);
    };
    draw();
  }

  ngOnDestroy(): void {
    this.timeouts.forEach(clearTimeout);
    this.intervals.forEach(clearInterval);
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }
}
