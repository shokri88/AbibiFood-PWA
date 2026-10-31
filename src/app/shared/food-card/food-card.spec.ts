import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FoodCard } from './food-card';
import { Menu } from '../../core/models';

const menu: Menu = {
  groups: [],
  foods: [
    {
      id: 1,
      name: 'پیتزا',
      description: 'غذای اصلی',
      price: 100,
      discountPrice: 80,
      image: '',
      groupIds: [],
      standalone: true,
    },
    { id: 2, name: 'سس', description: '', price: 20, image: '', groupIds: [], standalone: false },
    {
      id: 3,
      name: 'ناموجود',
      description: '',
      price: 30,
      image: '',
      groupIds: [],
      standalone: false,
      remaining: 0,
    },
  ],
  addons: [
    { id: 1, parentBranchFoodId: 1, addonBranchFoodId: 2, maxQuantity: 1 },
    { id: 2, parentBranchFoodId: 1, addonBranchFoodId: 3, maxQuantity: 1 },
  ],
};

describe('افزودن مستقیم غذا از کارت', () => {
  let fixture: ComponentFixture<FoodCard>;
  let card: FoodCard;
  let dialog: HTMLDialogElement;
  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [FoodCard],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(FoodCard);
    card = fixture.componentInstance;
    card.store.select({ id: 1, name: 'شعبه اول' });
    fixture.componentRef.setInput('food', menu.foods[0]);
    fixture.componentRef.setInput('menu', menu);
    fixture.detectChanges();
    dialog = fixture.nativeElement.querySelector('dialog');
    // JSDOM پنجره بومی مرورگر را ندارد؛ فقط مرز showModal/close شبیه‌سازی می‌شود.
    dialog.showModal = vi.fn(() => dialog.setAttribute('open', ''));
    dialog.close = vi.fn(() => dialog.removeAttribute('open'));
  });
  it('اولین افزودن با افزودنی، پنجره باز می‌کند و قبل از تأیید سبد را تغییر نمی‌دهد', () => {
    card.increase();
    expect(dialog.showModal).toHaveBeenCalledOnce();
    expect(card.store.count()).toBe(0);
    card.toggle(2);
    card.toggle(3);
    expect(card.total()).toBe(100);
    card.confirm();
    expect(card.store.cart()).toEqual([{ foodId: 1, addonIds: [2], quantity: 1 }]);
    card.increase();
    expect(dialog.showModal).toHaveBeenCalledOnce();
    expect(card.store.cart()[0].quantity).toBe(2);
    card.decrease();
    card.decrease();
    card.increase();
    expect(dialog.showModal).toHaveBeenCalledTimes(2);
  });
  it('بستن پنجره چیزی به سبد اضافه نمی‌کند و انتخاب‌ها پاک می‌شوند', () => {
    card.increase();
    card.toggle(2);
    card.close();
    expect(card.selected()).toEqual([]);
    expect(card.store.count()).toBe(0);
  });
  it('بدون انتخاب افزودنی هم غذای اصلی قابل افزودن است', () => {
    card.increase();
    card.confirm();
    expect(card.store.cart()).toEqual([{ foodId: 1, addonIds: [], quantity: 1 }]);
  });
  it('غذای بدون افزودنی مستقیماً از کارت اضافه می‌شود و لینک اطلاعات جداست', () => {
    fixture.componentRef.setInput('menu', { ...menu, addons: [] });
    fixture.detectChanges();
    const add: HTMLButtonElement = fixture.nativeElement.querySelector('.card-add');
    add.click();
    fixture.detectChanges();
    expect(card.store.foodQuantity(1)).toBe(1);
    expect(dialog.showModal).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.food-details').getAttribute('href')).toBe(
      '/food/1',
    );
    expect(fixture.nativeElement.querySelector('.card-quantity')).not.toBeNull();
  });
  it('تغییر شعبه حین نمایش افزودنی، ترکیب قدیمی را ثبت نمی‌کند', () => {
    card.increase();
    card.toggle(2);
    card.store.select({ id: 2, name: 'شعبه دوم' });
    card.confirm();
    expect(card.store.count()).toBe(0);
  });
});
