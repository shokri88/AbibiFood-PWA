import { describe, it, expect, beforeEach } from 'vitest';
import { StoreService } from './store.service';
describe('سبد نمایشی تا قبل از فاز فروش', () => {
  beforeEach(() => sessionStorage.clear());
  it('ترکیب‌های متفاوت یک غذا را در دو ردیف نگه می‌دارد', () => {
    const store = new StoreService();
    store.add(1, [2]);
    store.add(1, [3]);
    expect(store.cart().length).toBe(2);
    expect(store.count()).toBe(2);
  });
  it('ترکیب یکسان را با ترتیب متفاوت افزودنی ادغام می‌کند', () => {
    const store = new StoreService();
    store.add(1, [2, 3]);
    store.add(1, [3, 2]);
    expect(store.cart().length).toBe(1);
    expect(store.cart()[0].quantity).toBe(2);
  });
  it('تغییر شعبه سبد شعبه قبلی را پاک می‌کند', () => {
    const store = new StoreService();
    store.select({ id: 1, name: 'اول' });
    store.add(1);
    store.select({ id: 2, name: 'دوم' });
    expect(store.count()).toBe(0);
  });
  it('کاهش به صفر، ردیف را حذف می‌کند', () => {
    const store = new StoreService();
    store.add(1);
    store.quantity(0, -1);
    expect(store.count()).toBe(0);
  });
  it('انتخاب مجدد همان شعبه سبد را نگه می‌دارد', () => {
    const store = new StoreService();
    store.select({ id: 1, name: 'اول' });
    store.add(1);
    store.select({ id: 1, name: 'اول' });
    expect(store.count()).toBe(1);
  });
});

describe('کنترل تعداد غذا از روی کارت', () => {
  beforeEach(() => sessionStorage.clear());
  it('مجموع یک غذا را جدا از بقیه غذاها نشان می‌دهد', () => {
    const store = new StoreService();
    store.add(1, [2]);
    store.add(1, [3]);
    store.add(4);
    expect(store.foodQuantity(1)).toBe(2);
    expect(store.foodQuantity(4)).toBe(1);
  });
  it('آخرین ترکیب را تکرار می‌کند و ترکیب بدون افزودنی ناخواسته نمی‌سازد', () => {
    const store = new StoreService();
    store.add(1, [2]);
    store.add(1, [3]);
    store.increaseFood(1);
    expect(store.cart()).toEqual([
      { foodId: 1, addonIds: [2], quantity: 1 },
      { foodId: 1, addonIds: [3], quantity: 2 },
    ]);
    store.decreaseFood(1);
    store.decreaseFood(1);
    expect(store.cart()).toEqual([{ foodId: 1, addonIds: [2], quantity: 1 }]);
    store.decreaseFood(1);
    store.decreaseFood(1);
    expect(store.foodQuantity(1)).toBe(0);
  });
  it('محدودیت بیست عدد در هر ترکیب حفظ می‌شود', () => {
    const store = new StoreService();
    store.add(1, [2]);
    for (let i = 0; i < 25; i++) store.increaseFood(1);
    expect(store.foodQuantity(1)).toBe(20);
    expect(new StoreService().cart()).toEqual(store.cart());
  });
});
