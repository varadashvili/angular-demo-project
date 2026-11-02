import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from '../services/auth-service';
import {matchValidator} from './validator';
import {IUserInfo} from '../interfaces/IUserInfo';
import {ErrorMessage} from '../../../shared/components/error-message/error-message';
import {PublisherService} from '../../../shared/services/publisher-service';

@Component({
  imports: [
    ReactiveFormsModule,
    ErrorMessage,
  ],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  public publisherService = inject(PublisherService);
  public authServ = inject(AuthService);

  constructor() {
    this.publisherService.$activePagePublisher.next('register');
  }


  public userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(9)]),
    passwordGroup: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$'),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      [matchValidator('password', 'confirmPassword')],
    ),
    confirm: new FormControl('', [Validators.requiredTrue]),
  });

  public register() {
    const userInfo: IUserInfo = {
      username: this.usernameControl.value,
      email: this.emailControl.value,
      mobile: this.mobileControl.value,
      password: this.passwordControl.value,
    };

    this.authServ.register(userInfo);
  }

  public get usernameControl(): FormControl {
    return this.userForm.get('username') as FormControl;
  }
  public get emailControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }
  public get mobileControl(): FormControl {
    return this.userForm.get('mobile') as FormControl;
  }
  public get passwordControl(): FormControl {
    return this.userForm.get('passwordGroup')?.get('password') as FormControl;
  }
  public get confirmPasswordControl(): FormControl {
    return this.userForm.get('passwordGroup')?.get('confirmPassword') as FormControl;
  }
  public get confirmControl(): FormControl {
    return this.userForm.get('confirm') as FormControl;
  }
}
