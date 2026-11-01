import { Service } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Service()
export class PublisherService {
  public $activePagePublisher = new BehaviorSubject<string>('-');
}
