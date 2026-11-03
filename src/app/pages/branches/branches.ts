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
  selector: 'app-branches-page',
  imports: [RouterLink],
  templateUrl: './branches.html',
  styleUrl: './branches.css',
})
export class BranchesPage {
  api = inject(CatalogService);
  store = inject(StoreService);
  router = inject(Router);
  branches = signal<Branch[]>([]);
  error = signal('');
  loading = signal(false);
  constructor() {
    this.load();
  }
  async load() {
    this.loading.set(true);
    this.error.set('');
    try {
      this.branches.set(await this.api.branches());
    } catch {
      this.error.set('دریافت شعبه‌ها ممکن نشد.');
    } finally { this.loading.set(false); }
  }
  select(b: Branch) {
    if (
      this.store.count() &&
      this.store.branch()?.id !== b.id &&
      !confirm('با تغییر شعبه سبد پاک می‌شود. ادامه؟')
    )
      return;
    this.store.select(b);
    this.router.navigateByUrl('/home');
  }
}
