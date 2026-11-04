import {Component, inject, OnInit} from '@angular/core';
import {NewsService} from '../../services/news-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  imports: [],
  selector: 'app-news-items',
  styleUrl: './news-items.scss',
  templateUrl: './news-items.html',
})
export class NewsItems implements OnInit {
  public newsService = inject(NewsService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const categoryId = params['categoryId'];
      this.newsService.getNews(categoryId);
    });
  }
}
