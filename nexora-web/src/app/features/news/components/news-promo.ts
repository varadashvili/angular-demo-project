import {Component, input} from '@angular/core';
import {INewsInfo} from '../interfaces/INewsInfo';

@Component({
  imports: [],
  selector: 'app-news-promo',
  styles: `
    @use "../../../shared/styles/variables" as *;
    @use "../../../shared/styles/placeholders" as *;

    .m-news {
      display: -webkit-box;
      display: flex;
      border-radius: 20px;
      border: 1px solid $color-border;
      background: $color-surface;
      -webkit-box-shadow: 0 8px 24px 0 rgba(15, 23, 41, 0.08);
      box-shadow: 0 8px 24px 0 rgba(15, 23, 41, 0.08);
      overflow: hidden;

      &__image {
        -webkit-box-flex: 1;
        flex: 1 0 50%;
        background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 71.43%);
      }

      &__content {
        -webkit-box-flex: 1;
        flex: 1 0 50%;
        padding: 48px;
        gap: 16px;
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
      }

      &__head {
        display: -webkit-box;
        display: flex;
        gap: 10px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

        .tag {
          display: -webkit-box;
          display: flex;
          padding: 6px 12px;
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
          color: $color-accent-dark;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 100px;
          background: $color-tint;
        }

        .date {
          color: $color-muted;
          font-size: 13px;
          font-weight: 400;
        }
      }

      &__title {
        color: $color-dark;
        font-size: 30px;
        font-weight: 800;
        line-height: 42px;
      }

      &__text {
        color: $color-body;
        font-size: 17px;
        font-weight: 400;
        line-height: 28px;
      }

      &__author {
        display: -webkit-box;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        gap: 12px;

        .initials {
          @extend %flex-center;
          width: 44px;
          height: 44px;
          border-radius: 100px;
          background: linear-gradient(135deg, $color-accent 0%, $color-accent-2 71.43%);
          color: $color-white;
          font-size: 14px;
          font-weight: 700;
        }

        .author {
          &__name {
            color: $color-body;
            line-height: 1.6;
            font-size: 14px;
            font-weight: 600;
          }

          &__time {
            color: $color-muted;
            font-size: 13px;
            font-weight: 400;
          }
        }
      }
    }
  `,
  template: `
    <div class="m-news">
      <div class="m-news__image"></div>
      <div class="m-news__content">
        <div class="m-news__head">
          <span class="tag">{{ newsItem()?.categoryName }}</span>
          <span class="date">Featured · {{ newsItem()?.date }}</span>
        </div>
        <div class="m-news__title">{{ newsItem()?.title }}</div>
        <div class="m-news__text">{{ newsItem()?.content }}</div>
        <div class="m-news__author">
          <span class="initials">{{ newsItem()?.authorInitials }}</span>
          <div class="author">
            <span class="author__name">{{ newsItem()?.author }}</span>
            <br>
            <span class="author__time">{{ newsItem()?.timeToRead }} read</span>
          </div>
        </div>
        <a [href]="newsItem()?.url"  class="link">Read article →</a>
      </div>
    </div>
  `,
})
export class NewsPromo {
  public newsItem = input<INewsInfo | null>();
}
