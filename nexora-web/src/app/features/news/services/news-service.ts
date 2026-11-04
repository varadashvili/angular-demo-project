import {inject, Service, signal} from '@angular/core';
import {ContentApiService} from '../../../infrastructure/ContentApiService';
import {ErrorService} from '../../../shared/services/error-service';
import {SpinnerService} from '../../../shared/components/spinner/spinner-service';
import {INewsCategory} from '../interfaces/INewsCategory';
import {INewsInfo} from '../interfaces/INewsInfo';

@Service()
export class NewsService {
  private apiService = inject(ContentApiService);
  private errorService = inject(ErrorService);
  private spinnerService = inject(SpinnerService);

  public newsCategories = signal<INewsCategory[]>([]);
  public newsInfos = signal<INewsInfo[]>([]);

  public topNewsInfo = signal<INewsInfo | null>(null);

  public selectedCategoryId = signal<string | undefined | null>(null);

  public getNewsCategories() {
    this.spinnerService.$spinnerStatusPublisher.next(true);

    this.apiService.getNewsCategories().subscribe({
      next: (categories) => {
        this.newsCategories.set(categories);
      },
      error: (error) => {
        this.errorService.displayErrorMessage(error);
      },
      complete: () => {
        this.spinnerService.$spinnerStatusPublisher.next(false);
      }
    });
  }

  public getNews(category?: string) {
    this.spinnerService.$spinnerStatusPublisher.next(true);
    this.apiService.getNews().subscribe({
      next: (news) => {
        if (category) {
          news = news.filter(n => n.categoryId === category);
        }

        this.selectedCategoryId.set(category);

        if (news.length > 0) {
          this.topNewsInfo.set(news[0]);

          news = news .filter(n => n.id !== news[0].id);
        }
        this.newsInfos.set(news);
      },
      error: (error) => {
        this.errorService.displayErrorMessage(error);
      },
      complete: () => {
        this.spinnerService.$spinnerStatusPublisher.next(false);
      }
    });
  }
}
