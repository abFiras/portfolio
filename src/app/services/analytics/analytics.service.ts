import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  sendAnalyticEvent(action: string, category: string, label: string){
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }

  sendAnalyticPageView(path: string, title: string){
    if (typeof gtag !== 'undefined') {
      gtag('config', environment.gaId, {
        page_path: path,
        page_title: title
      });
    }
  }

}
