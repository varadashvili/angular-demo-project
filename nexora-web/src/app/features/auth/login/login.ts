import {Component, inject} from '@angular/core';
import {AuthService} from '../services/auth-service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ErrorMessage} from '../../../shared/components/error-message/error-message';
import {Router} from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule,
    ErrorMessage
  ],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  public authServ = inject(AuthService);
  private router = inject(Router);

  public userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(10)]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$'),
    ]),
  });

  public login() {
    const user = {
      email: this.emailControl.value,
      password: this.passwordControl.value,
    };

    this.authServ.login(user).subscribe((success) => {
      if (success) {
        this.router.navigate(['/main']);
      }
    });

  }

  public get emailControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.userForm.get('password') as FormControl;
  }

  public navigateToRegister($event: Event) {
    $event.preventDefault();
    this.authServ.$showLoginPublisher.next(false);

    this.router.navigate(['/register']);
  }
}
