import {Component, inject} from '@angular/core';
import {PublisherService} from '../../shared/services/publisher-service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  public publisherService = inject(PublisherService);

  constructor() {
    this.publisherService.$activePagePublisher.next('contact');
  }}
