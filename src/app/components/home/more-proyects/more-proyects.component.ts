import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-more-proyects',
  templateUrl: './more-proyects.component.html',
  styleUrls: ['./more-proyects.component.scss'],
  standalone: false
})
export class MoreProyectsComponent implements OnInit, OnDestroy {
  projects: any[] = [];
  private sub: Subscription;

  constructor(
    public analyticsService: AnalyticsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
  this.sub = this.translate.stream('OtherProjects.Projects').subscribe((res: any) => {
    this.projects = Array.isArray(res) ? res : [];
  });
}

ngOnDestroy(): void {
  if (this.sub) this.sub.unsubscribe();
}

  redirect(url: string, event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('a')) return;
    if (url) window.open(url, '_blank');
  }

  
}
