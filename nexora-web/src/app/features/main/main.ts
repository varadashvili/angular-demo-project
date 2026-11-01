import {Component, inject} from '@angular/core';
import {PublisherService} from '../../shared/services/publisher-service';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  public publisherService = inject(PublisherService);

  constructor() {
    this.publisherService.$activePagePublisher.next('main');
  }
}
