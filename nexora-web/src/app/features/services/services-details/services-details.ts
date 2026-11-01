import {Component, inject} from '@angular/core';
import {PublisherService} from '../../../shared/services/publisher-service';

@Component({
  selector: 'app-services-details',
  imports: [],
  templateUrl: './services-details.html',
  styleUrl: './services-details.scss',
})
export class ServicesDetails {
  public publisherService = inject(PublisherService);

  constructor() {
    this.publisherService.$activePagePublisher.next('services');
  }
}
