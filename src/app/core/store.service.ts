import { Injectable, signal, computed } from '@angular/core';
import { Branch, CartLine } from './models';
@Injectable({ providedIn: 'root' })
export class StoreService {
  readonly branch = signal<Branch | null>(null);
  readonly cart = signal<CartLine[]>([]);
  readonly count = computed(() => this.cart().reduce((s, x) => s + x.quantity, 0));
  constructor() {
    try {
      this.branch.set(JSON.parse(sessionStorage.getItem('abibi.branch') || 'null'));
      this.cart.set(JSON.parse(sessionStorage.getItem('abibi.cart') || '[]'));
    } catch {
      this.cart.set([]);
    }
  }
  select(branch: Branch): void {
    if (this.branch()?.id !== branch.id) this.cart.set([]);
    this.branch.set(branch);
    this.save();
  }
  add(foodId: number, addonIds: number[] = []): void {
    const list = this.cart().map((x) => ({ ...x }));
    const key = [...addonIds].sort().join(',');
    const found = list.find((x) => x.foodId === foodId && [...x.addonIds].sort().join(',') === key);
    if (found) {
      if (found.quantity < 20) found.quantity++;
    } else list.push({ foodId, quantity: 1, addonIds: [...addonIds] });
    this.cart.set(list);
    this.save();
  }
  quantity(index: number, delta: number): void {
    this.cart.update((lines) =>
      lines
        .map((x, i) => (i === index ? { ...x, quantity: Math.min(20, x.quantity + delta) } : x))
        .filter((x) => x.quantity > 0),
    );
    this.save();
  }
  private save(): void {
    try {
      sessionStorage.setItem('abibi.branch', JSON.stringify(this.branch()));
      sessionStorage.setItem('abibi.cart', JSON.stringify(this.cart()));
    } catch {
      /* فقط پیش‌نمایش: ذخیره مرورگر ممکن است غیرفعال باشد. */
    }
  }
}
