import {Component, inject} from '@angular/core';
import {PublisherService} from '../../../shared/services/publisher-service';

@Component({
  selector: 'app-services-landing',
  imports: [],
  templateUrl: './services-landing.html',
  styleUrl: './services-landing.scss',
})
export class ServicesLanding {
  public publisherService = inject(PublisherService);

  constructor() {
    this.publisherService.$activePagePublisher.next('services');
  }
}
