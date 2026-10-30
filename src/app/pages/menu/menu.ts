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
  selector: 'app-menu-page',
  imports: [FormsModule, FoodCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuPage {
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
  ngOnInit() {
    this.group.set(Number(this.route.snapshot.queryParamMap.get('group')) || 0);
  }
  route = inject(ActivatedRoute);
  query = signal('');
  group = signal(0);
  list = computed(() => {
    const q = this.query().replace(/[ي]/g, 'ی').replace(/[ك]/g, 'ک').replace(/[\s‌]/g, '');
    return this.menu().foods.filter(
      (f) =>
        f.standalone &&
        (!this.group() || f.groupIds.includes(this.group())) &&
        (f.name + f.description)
          .replace(/[ي]/g, 'ی')
          .replace(/[ك]/g, 'ک')
          .replace(/[\s‌]/g, '')
          .includes(q),
    );
  });
}
