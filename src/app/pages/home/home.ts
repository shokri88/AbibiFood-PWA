import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/catalog.service';
import { StoreService } from '../../core/store.service';
import { SettingsService } from '../../core/settings.service';
import { Branch, Menu, Food } from '../../core/models';
import { FoodCard } from '../../shared/food-card/food-card';
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, FoodCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage {
  api = inject(CatalogService);
  store = inject(StoreService);
  settings = inject(SettingsService);
  router = inject(Router);
  menu = signal<Menu>({ foods: [], groups: [], addons: [] });
  error = signal('');
  constructor() {
    this.load();
  }
  async load() {
    const b = this.store.branch();
    if (!b) {
      this.router.navigateByUrl('/branches');
      return;
    }
    try {
      const menu = await this.api.menu(b.id);
      const pool = menu.foods.filter(f => f.standalone);
      // فقط هنگام دریافت داده تصادفی شود؛ انتخاب‌ها با هر رندر تغییر نکنند.
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      this.suggestions.set(pool.slice(0, 4));
      this.menu.set(menu);
      this.error.set('');
    } catch {
      this.error.set(this.settings.text('apiError'));
    }
  }
  standalone() {
    return this.menu().foods.filter((f) => f.standalone);
  }
  hasOffers() {
    return this.standalone().some((f) => f.discountPrice != null);
  }
  suggestions = signal<Food[]>([]);
  featuredFoods() { const ranked = this.bestSellers(); return ranked.length ? ranked : this.suggestions(); }
  bestSellers() {
    return (this.menu().bestSellerIds ?? []).map(id => this.standalone().find(f => f.id === id)).filter((food): food is Food => !!food);
  }
  heroFood() { return this.standalone()[this.slide()]; }
  slide = signal(0);
  next() {
    this.slide.update((n) => (n + 1) % Math.max(1, Math.min(3, this.standalone().length)));
  }
}
