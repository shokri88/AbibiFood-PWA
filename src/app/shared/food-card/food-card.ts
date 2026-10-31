import { Component, ElementRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Food, Menu } from '../../core/models';
import { StoreService } from '../../core/store.service';

@Component({
  selector: 'app-food-card',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './food-card.html',
  styleUrl: './food-card.css',
})
export class FoodCard {
  readonly food = input.required<Food>();
  readonly menu = input<Menu | null>(null);
  readonly store = inject(StoreService);
  readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('addonDialog');
  readonly selected = signal<number[]>([]);
  private openedBranchId?: number;
  readonly quantity = computed(() => this.store.foodQuantity(this.food().id));
  readonly canIncrease = computed(() => {
    const index = this.store.latestLineIndex(this.food().id);
    return (
      this.food().standalone &&
      this.food().remaining !== 0 &&
      (index < 0 || this.store.cart()[index].quantity < 20)
    );
  });
  readonly addons = computed(() => {
    const menu = this.menu();
    const ids = new Set(
      menu?.addons
        .filter((addon) => addon.parentBranchFoodId === this.food().id && addon.maxQuantity > 0)
        .map((addon) => addon.addonBranchFoodId),
    );
    return menu?.foods.filter((food) => ids.has(food.id)) ?? [];
  });
  readonly total = computed(() =>
    [this.food(), ...this.addons().filter((food) => this.selected().includes(food.id))].reduce(
      (sum, food) => sum + (food.discountPrice ?? food.price),
      0,
    ),
  );

  increase(): void {
    if (!this.canIncrease()) return;
    if (this.quantity() === 0 && this.addons().length > 0) {
      this.selected.set([]);
      this.openedBranchId = this.store.branch()?.id;
      this.dialog().nativeElement.showModal();
    } else {
      this.store.increaseFood(this.food().id);
    }
  }
  toggle(id: number): void {
    if (!this.addons().some((food) => food.id === id && food.remaining !== 0)) return;
    this.selected.update((ids) =>
      ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
    );
  }
  confirm(): void {
    // تغییر شعبه در زمان بازبودن پنجره نباید ترکیب شعبه قبلی را وارد سبد جدید کند.
    if (this.openedBranchId === this.store.branch()?.id && this.canIncrease()) {
      const allowed = this.addons()
        .filter((food) => food.remaining !== 0)
        .map((food) => food.id);
      this.store.add(
        this.food().id,
        this.selected().filter((id) => allowed.includes(id)),
      );
    }
    this.close();
  }
  close(): void {
    this.dialog().nativeElement.close();
    this.selected.set([]);
  }
  decrease(): void {
    this.store.decreaseFood(this.food().id);
  }
}
