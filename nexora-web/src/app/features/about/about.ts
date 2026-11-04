import {Component, inject} from '@angular/core';
import {PublisherService} from '../../shared/services/publisher-service';
import {AboutService} from './services/about-service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  public publisherService = inject(PublisherService);
  public aboutService = inject(AboutService);

  constructor() {
    this.publisherService.$activePagePublisher.next('about');

    this.aboutService.getFounders();
    this.aboutService.getMissions();
  }
}
