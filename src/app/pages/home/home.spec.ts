import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it } from 'vitest';
import { expect } from 'vitest';
import { HomePage } from './home';
import { CatalogService } from '../../core/catalog.service';
import { StoreService } from '../../core/store.service';
import { Menu } from '../../core/models';

const foods = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1, name: 'غذا ' + (i + 1), description: '', price: 1000, image: '', standalone: true, groupIds: [],
}));
async function setup(menu: Menu) {
  TestBed.configureTestingModule({ imports: [HomePage], providers: [provideRouter([]),
    { provide: CatalogService, useValue: { menu: async () => menu } },
  ] });
  TestBed.inject(StoreService).select({ id: 1, name: 'شعبه' });
  const fixture = TestBed.createComponent(HomePage);
  await fixture.whenStable(); fixture.detectChanges();
  return fixture;
}
describe('پیشنهاد جایگزین پرفروش‌ها', () => {
  it('بدون فروش، چهار غذای واقعی و متفاوت را انتخاب و تا بارگذاری بعدی ثابت نگه می‌دارد', async () => {
    const fixture = await setup({ foods: [...foods, { ...foods[0], id: 99, standalone: false }], groups: [], addons: [], bestSellerIds: [] });
    const page = fixture.componentInstance;
    const chosen = page.featuredFoods().map(f => f.id);
    expect(chosen).toHaveLength(4);
    expect(new Set(chosen).size).toBe(4);
    expect(chosen.every(id => foods.some(f => f.id === id))).toBe(true);
    fixture.detectChanges();
    expect(page.featuredFoods().map(f => f.id)).toEqual(chosen);
    expect(fixture.nativeElement.textContent).toContain('انتخاب‌های پیشنهادی');
    expect(fixture.nativeElement.textContent).not.toContain('پرفروش‌ترین‌ها');
  });
  it('در حضور فروش، همان ترتیب سرور را نشان می‌دهد', async () => {
    const fixture = await setup({ foods, groups: [], addons: [], bestSellerIds: [4, 2] });
    expect(fixture.componentInstance.featuredFoods().map(f => f.id)).toEqual([4, 2]);
    expect(fixture.nativeElement.textContent).toContain('پرفروش‌ترین‌ها');
  });
  it('با منوی خالی غذا یا رتبه ساختگی ایجاد نمی‌کند', async () => {
    const fixture = await setup({ foods: [], groups: [], addons: [] });
    expect(fixture.componentInstance.featuredFoods()).toEqual([]);
  });
});
