import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, Observable, tap} from 'rxjs';
import {IUserInfo} from '../features/auth/interfaces/IUserInfo';

export const baseUrl = 'http://localhost:3000';

@Service()
export class AuthApiService {
  private http = inject(HttpClient);

  public getUsers(): Observable<IUserInfo[]> {
    return this.http.get<IUserInfo[]>(`${baseUrl}/users`).pipe(
      delay(2000),
      tap({
        next:
          (users: IUserInfo[]) => {
            console.log('Users fetched successfully:', users);
          },
        error: () => {
          throw new Error('Http Request Error');
        },
      }),
    );
  }

  public login(): Observable<IUserInfo[]> {
    return this.getUsers();
  }

  public registerUser(userInfo: IUserInfo): Observable<IUserInfo> {
    return this.http.post<IUserInfo>(`${baseUrl}/users`, userInfo, {timeout: 2000}).pipe(
      delay(1000),
      catchError((error) => {
        throw new Error('Http Request Error');
      }),
    );
  }
}
