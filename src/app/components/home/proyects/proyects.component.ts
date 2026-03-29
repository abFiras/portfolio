import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss'],
  standalone: false
})
export class ProyectsComponent implements OnInit, OnDestroy {
  projects: any[] = [];
  sectionLabel = '';
  currentImgIndex: { [key: number]: number } = {};
  imgErrors: { [key: number]: boolean } = {};
  private autoSlideIntervals: { [key: number]: any } = {};
  private sub: Subscription;

  constructor(
    public analyticsService: AnalyticsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
  this.sub = this.translate.stream(['FeatureProjects.Projects', 'FeatureProjects.Label'])
    .subscribe((res: any) => {
      const list = res['FeatureProjects.Projects'];
      this.projects = Array.isArray(list) ? list : [];
      this.sectionLabel = res['FeatureProjects.Label'] || 'Featured Project';
      this.projects.forEach((_, i) => {
        if (this.currentImgIndex[i] === undefined) {
          this.currentImgIndex[i] = 0;
          this.startAutoSlide(i);
        }
      });
    });
}

ngOnDestroy(): void {
  if (this.sub) this.sub.unsubscribe();
  Object.values(this.autoSlideIntervals).forEach(clearInterval);
}

  private startAutoSlide(cardIndex: number): void {
    if (this.autoSlideIntervals[cardIndex]) clearInterval(this.autoSlideIntervals[cardIndex]);
    this.autoSlideIntervals[cardIndex] = setInterval(() => {
      const proj = this.projects[cardIndex];
      if (!proj || !proj.imgs || proj.imgs.length <= 1) return;
      this.currentImgIndex[cardIndex] = (this.currentImgIndex[cardIndex] + 1) % proj.imgs.length;
    }, 3500 + cardIndex * 400);
  }

  setImg(cardIndex: number, imgIndex: number): void {
    this.currentImgIndex[cardIndex] = imgIndex;
  }

  getImgIndex(cardIndex: number, total: number): number {
    return (this.currentImgIndex[cardIndex] || 0) % Math.max(total, 1);
  }

  onImgError(event: Event, cardIndex: number): void {
    this.imgErrors[cardIndex] = true;
  }

  debug(): void {}

  
}
