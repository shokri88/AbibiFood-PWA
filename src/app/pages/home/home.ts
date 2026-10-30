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
      this.menu.set(await this.api.menu(b.id));
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
  slide = signal(0);
  next() {
    this.slide.update((n) => (n + 1) % 3);
  }
}
