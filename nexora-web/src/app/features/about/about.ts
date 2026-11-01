import {Component, inject} from '@angular/core';
import {PublisherService} from '../../shared/services/publisher-service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  public publisherService = inject(PublisherService);

  constructor() {
    this.publisherService.$activePagePublisher.next('about');
  }
}
