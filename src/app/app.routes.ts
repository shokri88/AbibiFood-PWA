import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/splash/splash').then((m) => m.SplashPage) },
  {
    path: 'branches',
    loadComponent: () => import('./pages/branches/branches').then((m) => m.BranchesPage),
  },
  { path: 'home', loadComponent: () => import('./pages/home/home').then((m) => m.HomePage) },
  { path: 'menu', loadComponent: () => import('./pages/menu/menu').then((m) => m.MenuPage) },
  {
    path: 'food/:id',
    loadComponent: () => import('./pages/product/product').then((m) => m.ProductPage),
  },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart').then((m) => m.CartPage) },
  { path: 'club', loadComponent: () => import('./pages/club/club').then((m) => m.ClubPage) },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account').then((m) => m.AccountPage),
  },
  { path: '**', redirectTo: 'home' },
];
