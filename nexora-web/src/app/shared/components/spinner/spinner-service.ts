import { Service } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Service()
export class SpinnerService {
  public $spinnerStatusPublisher = new BehaviorSubject(false);
}
