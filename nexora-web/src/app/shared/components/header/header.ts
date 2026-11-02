import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {AuthService} from '../../../features/auth/services/auth-service';
import {RouterLink} from '@angular/router';
import {PublisherService} from '../../services/publisher-service';
import {Subscriber} from 'rxjs';
import {ErrorService} from '../../services/error-service';
import {ErrorMessage} from '../error-message/error-message';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ErrorMessage
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements  OnInit, OnDestroy {
  protected readonly AuthService = inject(AuthService);
  protected readonly errorServ = inject(ErrorService);

  private publisherService = inject(PublisherService);

  public readonly activePage = signal<string>('');

  constructor() {

  }

  ngOnInit(): void {
    this.publisherService.$activePagePublisher.subscribe((activePage) => {
      this.activePage.set(activePage);
    });
  }


  ngOnDestroy(): void {
    this.publisherService.$activePagePublisher.unsubscribe();
  }
}
