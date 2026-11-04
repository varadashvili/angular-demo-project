import {Component, inject, signal} from '@angular/core';
import {PublisherService} from '../../../shared/services/publisher-service';
import {NewsService} from '../services/news-service';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-news-landing',
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './news-landing.html',
  styleUrl: './news-landing.scss',
})
export class NewsLanding {
  public publisherService = inject(PublisherService);
  public newsService = inject(NewsService);



  constructor() {
    this.publisherService.$activePagePublisher.next('news');

    this.newsService.getNewsCategories();
  }
}
