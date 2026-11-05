import {Component, input} from '@angular/core';
import {INewsInfo} from '../interfaces/INewsInfo';

@Component({
  imports: [],
  selector: 'app-news-item',
  template: `
    <div class="news-cards__image"></div>
    <div class="news-cards__content">
      <div class="news-cards__head">
        <span class="tag">{{ newsItem()?.categoryName }}</span>
        <span class="date">{{ newsItem()?.date }}</span>
      </div>
      <h3 class="news-cards__title">{{ newsItem()?.title }}</h3>
      <div class="news-cards__text">{{ newsItem()?.content }}</div>
      <a class="link">Read article →</a>
    </div>
  `,
})
export class NewsItem {
  public newsItem = input<INewsInfo | null>();
}
