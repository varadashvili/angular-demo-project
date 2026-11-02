import {inject, Service, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from '../shared/services/error-service';
import {SpinnerService} from '../shared/components/spinner/spinner-service';
import {delay, Observable, of, switchMap, tap} from 'rxjs';
import {IUserInfo} from '../features/auth/interfaces/IUserInfo';

export const baseUrl = 'http://localhost:3000';

@Service()
export class HttpClientService {
  private http = inject(HttpClient);
  private errorServ = inject(ErrorService);

  public getUsers(): Observable<IUserInfo[]> {
    return this.http.get<IUserInfo[]>(`${baseUrl}/users`).pipe(
      delay(2000),
      tap({
        next:
          (users: IUserInfo[]) => {
          },
        error: () => {
          this.errorServ.setErrMsg('Http Request Error');
          this.errorServ.clearMsg();
        },
      }),
    );
  }

  public login(): Observable<IUserInfo[]> {
    return this.getUsers();
  }

  public register(userInfo: IUserInfo): Observable<IUserInfo[] | IUserInfo> {

    return this.getUsers().pipe(
      delay(2000),
      switchMap((usersInfo) => {
        const findedUser = usersInfo.find(
          (user) => user.email === userInfo.email || user.mobile === userInfo.mobile,
        );

        if (!findedUser) {
          return this.registerUser(userInfo);
        }

        this.errorServ.setErrMsg('this email or mobile is already registered');
        this.errorServ.clearMsg();

        return of([] as IUserInfo[]);
      }),
    );
  }

  public registerUser(userInfo: IUserInfo): Observable<IUserInfo> {
    return this.http.post<IUserInfo>(`${baseUrl}/users`, userInfo).pipe(
      delay(2000),
      tap({
        next:
          (user: IUserInfo) => {
          },
        error: () => {
          this.errorServ.setErrMsg('Http Request Error');
          this.errorServ.clearMsg();
        },
      }),
    );
  }
}
