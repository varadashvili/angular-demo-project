import {Component, inject} from '@angular/core';
import {PublisherService} from '../../../shared/services/publisher-service';

@Component({
  selector: 'app-news-landing',
  imports: [],
  templateUrl: './news-landing.html',
  styleUrl: './news-landing.scss',
})
export class NewsLanding {
  public publisherService = inject(PublisherService);

  constructor() {
    this.publisherService.$activePagePublisher.next('news');
  }
}
