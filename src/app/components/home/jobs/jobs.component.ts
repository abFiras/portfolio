import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: false
})
export class JobsComponent implements OnInit, OnDestroy {
  active = 0;
  jobs: any[] = [];
  private sub: Subscription;

  constructor(
    public analyticsService: AnalyticsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
  this.sub = this.translate.stream('Experience.Jobs').subscribe((res: any) => {
    this.jobs = Array.isArray(res) ? res : [];
  });
}

ngOnDestroy(): void {
  if (this.sub) this.sub.unsubscribe();
}
}
