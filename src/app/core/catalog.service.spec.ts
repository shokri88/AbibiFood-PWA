import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { describe, it, expect } from 'vitest';
import { CatalogService } from './catalog.service';
import { SettingsService } from './settings.service';

describe('ترتیب تصاویر کاتالوگ', () => {
  it('تصویر اول را اصلی می‌گیرد و سایر تصاویر را به ترتیب حفظ می‌کند', async () => {
    TestBed.configureTestingModule({ providers: [
      { provide: SettingsService, useValue: { config: () => ({ mode: 'api', apiBaseUrl: 'https://api.example/' }) } },
      { provide: HttpClient, useValue: { get: () => of({ groups: [{ id: 1, title: "گروه", imagePath: "/uploads/group.png" }], bestSellerIds: [2, 1], specialFoodIds: [1], banners: [{ id: 9, branchFoodId: 1, title: 'عنوان بنر', text: 'متن', imagePath: '/uploads/banner.png' }], memberships: [], addons: [], foods: [
        { id: 1, name: 'غذا', images: ['/main.png', '/second.png'], canSellStandalone: true },
        { id: 2, name: 'بدون تصویر', images: [], canSellStandalone: true },
      ] }) } },
    ] });
    const menu = await TestBed.inject(CatalogService).menu(1);
    expect(menu.groups[0].image).toBe('https://api.example/uploads/group.png');
    expect(menu.bestSellerIds).toEqual([2, 1]);
    expect(menu.specialFoodIds).toEqual([1]);
    expect(menu.banners?.[0].image).toBe('https://api.example/uploads/banner.png');
    expect(menu.foods[0].image).toBe('https://api.example/main.png');
    expect(menu.foods[0].images).toEqual(['https://api.example/main.png', 'https://api.example/second.png']);
    expect(menu.foods[1].image).toBe('assets/image/logo.webp');
    expect(menu.foods[1].images).toEqual([]);
  });
});
