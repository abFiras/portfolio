import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms ease-in', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))])
    ])
  ],
  standalone: false
})
export class AboutComponent implements OnInit {
  isImageModalOpen = false;

  constructor(public analyticsService: AnalyticsService) {}

  ngOnInit(): void {}

  openImageModal(): void {
    this.isImageModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeImageModal(): void {
    this.isImageModalOpen = false;
    document.body.style.overflow = '';
  }

  onModalBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) this.closeImageModal();
  }
}
