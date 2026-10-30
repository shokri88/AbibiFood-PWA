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
  selector: 'app-product-page',
  imports: [DecimalPipe],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductPage {
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
  route = inject(ActivatedRoute);
  selected = signal<number[]>([]);
  food = computed(() =>
    this.menu().foods.find((f) => f.id === Number(this.route.snapshot.paramMap.get('id'))),
  );
  addons = computed(() =>
    this.menu()
      .addons.filter((a) => a.parentBranchFoodId === this.food()?.id)
      .map((a) => this.menu().foods.find((f) => f.id === a.addonBranchFoodId))
      .filter((f): f is Food => !!f),
  );
  toggle(id: number) {
    this.selected.update((x) => (x.includes(id) ? x.filter((i) => i !== id) : [...x, id]));
  }
  total() {
    return [this.food(), ...this.menu().foods.filter((f) => this.selected().includes(f.id))].reduce(
      (s, f) => s + (f ? (f.discountPrice ?? f.price) : 0),
      0,
    );
  }
  add() {
    const f = this.food();
    if (f) {
      this.store.add(f.id, this.selected());
      this.router.navigateByUrl('/cart');
    }
  }
}
