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
  selector: 'app-cart-page',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartPage {
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
  food(id: number) {
    return this.menu().foods.find((f) => f.id === id);
  }
  lineTotal(id: number, addons: number[], quantity: number) {
    return (
      [id, ...addons].reduce((s, i) => {
        const f = this.food(i);
        return s + (f ? (f.discountPrice ?? f.price) : 0);
      }, 0) * quantity
    );
  }
  total() {
    return this.store
      .cart()
      .reduce((s, l) => s + this.lineTotal(l.foodId, l.addonIds, l.quantity), 0);
  }
}
