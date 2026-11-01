import {inject, Service, signal} from '@angular/core';
import {HttpClientService} from '../../../infrastructure/http-client-service';
import {Router} from '@angular/router';
import {ErrorService} from '../../../shared/services/error-service';
import {IUserInfo} from '../interfaces/IUserInfo';
import {IUser} from '../interfaces/IUser';
import {BehaviorSubject} from 'rxjs';

@Service()
export class AuthService {
  private apiService = inject(HttpClientService);
  private router = inject(Router);
  private errorServ = inject(ErrorService);

  public $showLoginPublisher = new BehaviorSubject(false);

  public userInfo = signal<IUserInfo | null>(null);

  constructor() {
    const findedUser: string | null = localStorage.getItem('user');

    if (findedUser) {
      this.userInfo.set(JSON.parse(findedUser));
    } else {
      this.userInfo.set(null);
    }
  }

  public login(user: IUser) {
    this.apiService.login().subscribe((usersInfo: IUserInfo[]) => {
      const findedUser = usersInfo.find(
        (userInfo) => userInfo.email === user.email && userInfo.password === user.password,
      );

      if (findedUser) {
        console.log(findedUser);
        this.userInfo.set(findedUser);
        localStorage.setItem('user', JSON.stringify(findedUser));
        this.router.navigateByUrl('/dashboard/products/acer');
      } else {
        this.errorServ.setErrMsg('Wrong email or password');
        this.errorServ.clearMsg();
      }
    });
  }

  public register(userInfo: IUserInfo) {
    this.apiService.register(userInfo).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
