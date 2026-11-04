import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, Observable, tap} from 'rxjs';
import {IPartnerInfo} from '../features/main/interfaces/IPartnerInfo';
import {IMission} from '../features/about/interfaces/IMission';
import {IFounder} from '../features/about/interfaces/IFounder';
import {INewsInfo} from '../features/news/interfaces/INewsInfo';
import {INewsCategory} from '../features/news/interfaces/INewsCategory';

export const baseUrl = 'http://localhost:3000';

@Service()
export class ContentApiService {
  private http = inject(HttpClient);

  public getPartners(): Observable<IPartnerInfo[]> {
    return this.http.get<IPartnerInfo[]>(`${baseUrl}/partners`).pipe(
      delay(1000),
      catchError((error) => {
        console.log('Error fetching partners:', error);
        throw new Error('Http Request Error');
      }),
    );
  }

  public getMissions(): Observable<IMission[]> {
    return this.http.get<IMission[]>(`${baseUrl}/missions`).pipe(
      delay(1000),
      catchError((error) => {
        console.log('Error fetching missions:', error);
        throw new Error('Http Request Error');
      }),
    );
  }

  public getFounders(): Observable<IFounder[]> {
    return this.http.get<IFounder[]>(`${baseUrl}/founders`).pipe(
      delay(1000),
      catchError((error) => {
        console.log('Error fetching founders:', error);
        throw new Error('Http Request Error');
      }),
    );
  }

  public getNews(): Observable<INewsInfo[]> {
    return this.http.get<INewsInfo[]>(`${baseUrl}/news`).pipe(
      delay(500),
      catchError((error) => {
        console.log('Error fetching news:', error);
        throw new Error('Http Request Error');
      }),
    );
  }

  public getNewsCategories(): Observable<INewsCategory[]> {
    return this.http.get<INewsCategory[]>(`${baseUrl}/newsCategories`).pipe(
      delay(500),
      catchError((error) => {
        console.log('Error fetching news categories:', error);
        throw new Error('Http Request Error');
      }),
    );
  }
}
