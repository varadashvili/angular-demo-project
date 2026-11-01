import {Component, inject} from '@angular/core';
import {PublisherService} from '../../../shared/services/publisher-service';

@Component({
  selector: 'app-news-details',
  imports: [],
  templateUrl: './news-details.html',
  styleUrl: './news-details.scss',
})
export class NewsDetails {
  public publisherService = inject(PublisherService);

  constructor() {
    this.publisherService.$activePagePublisher.next('news');
  }
}
