import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './shared/components/header/header';
import {Footer} from './shared/components/footer/footer';
import {Spinner} from './shared/components/spinner/spinner';
import {SpinnerService} from './shared/components/spinner/spinner-service';
import {AsyncPipe} from '@angular/common';
import {AuthService} from './features/auth/services/auth-service';
import {Login} from './features/auth/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Spinner, AsyncPipe, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nexora-web');

  public spinnerService = inject(SpinnerService);
  protected readonly AuthService = inject(AuthService);
}
