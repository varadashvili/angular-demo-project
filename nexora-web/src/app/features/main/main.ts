import {Component, inject} from '@angular/core';
import {PublisherService} from '../../shared/services/publisher-service';
import {MainService} from './services/main-service';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  public publisherService = inject(PublisherService);
  public mainService = inject(MainService);

  constructor() {
    this.publisherService.$activePagePublisher.next('main');

    this.mainService.getPartners();
  }
}
