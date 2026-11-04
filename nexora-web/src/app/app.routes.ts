import { Routes } from '@angular/router';
import {Main} from './features/main/main';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: Main,
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'news',
    loadComponent: () => import('./features/news/news-landing/news-landing').then((m) => m.NewsLanding),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/news/components/news-items/news-items').then((m) => m.NewsItems),
      },
      {
        path: 'cat/:categoryId',
        loadComponent: () => import('./features/news/components/news-items/news-items').then((m) => m.NewsItems),
      }
    ]
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services-landing/services-landing').then((m) => m.ServicesLanding),
  }
];
