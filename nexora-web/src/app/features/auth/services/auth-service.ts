import {inject, Service, signal} from '@angular/core';
import {HttpClientService} from '../../../infrastructure/http-client-service';
import {ErrorService} from '../../../shared/services/error-service';
import {IUserInfo} from '../interfaces/IUserInfo';
import {IUser} from '../interfaces/IUser';
import {BehaviorSubject, catchError, finalize, map, Observable, of} from 'rxjs';
import {SpinnerService} from '../../../shared/components/spinner/spinner-service';

@Service()
export class AuthService {
  private apiService = inject(HttpClientService);
  private errorServ = inject(ErrorService);
  private spinnerServ = inject(SpinnerService);

  public $showLoginPublisher = new BehaviorSubject(false);

  public isAuthenticated = signal<boolean>(false);

  public userInfo = signal<IUserInfo | null>(null);

  constructor() {
    const findedUser: string | null = localStorage.getItem('user');

    if (findedUser) {
      this.setUserInfo(JSON.parse(findedUser));
    } else {
      this.userInfo.set(null);
    }
  }

  private setUserInfo(userInfo: IUserInfo) {
    this.userInfo.set(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
    this.isAuthenticated.set(true);
    this.$showLoginPublisher.next(false);
  }

  public login(user: IUser): Observable<boolean> {
    this.spinnerServ.$spinnerStatusPublisher.next(true);

    return this.apiService.login().pipe(
      map((usersInfo: IUserInfo[]) => {
        const findedUser = usersInfo.find(
          (userInfo) => userInfo.email === user.email && userInfo.password === user.password,
        );

        if (!findedUser) {
          this.errorServ.setErrMsg('Wrong email or password');
          this.errorServ.clearMsg();
          return false;
        }

        this.setUserInfo(findedUser);
        return true;
      }),
      catchError(() => of(false)),
      finalize(() => this.spinnerServ.$spinnerStatusPublisher.next(false)),
    );
  }

  public logout() {
    this.userInfo.set(null);
    localStorage.removeItem('user');
    this.isAuthenticated.set(false);
  }

  public register(userInfo: IUserInfo) {
    this.spinnerServ.$spinnerStatusPublisher.next(true);
    this.apiService.register(userInfo).subscribe({
      next: () => {
        //this.spinnerServ.$spinnerStatusPublisher.next(false);
        this.$showLoginPublisher.next(true);
      },
      error: () => {
        //this.spinnerServ.$spinnerStatusPublisher.next(false);
      },
      complete: () => {
        this.spinnerServ.$spinnerStatusPublisher.next(false);
      }
    });
  }
}
