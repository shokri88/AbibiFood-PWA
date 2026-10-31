import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SettingsService } from './settings.service';
import { TEMPLATE_DATA } from './template-data';
import { Branch, Menu } from './models';
interface ApiMenu {
  foods: {
    id: number;
    foodId: number;
    name: string;
    title: string;
    description: string;
    price: number;
    discountPrice: number | null;
    images: string[];
    remaining: number;
    canSellStandalone: boolean;
  }[];
  groups: { id: number; title: string }[];
  memberships: { branchGroupId: number; branchFoodId: number }[];
  addons: Menu['addons'];
}
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private http = inject(HttpClient);
  private settings = inject(SettingsService);
  private url(path: string): string {
    return this.settings.config().apiBaseUrl.replace(/\/$/, '') + path;
  }
  async branches(): Promise<Branch[]> {
    if (this.settings.config().mode === 'template') return TEMPLATE_DATA.branches;
    return firstValueFrom(this.http.get<Branch[]>(this.url('/api/catalog/branches')));
  }
  async menu(branchId: number): Promise<Menu> {
    if (this.settings.config().mode === 'template') {
      const names = [...new Set(TEMPLATE_DATA.products.map((p) => p.cat))];
      return {
        groups: names.map((title, i) => ({ id: i + 1, title })),
        addons: TEMPLATE_DATA.addons,
        foods: TEMPLATE_DATA.products.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.desc,
          price: p.price,
          discountPrice: (
            { 1: 548000, 2: 878000, 3: 338000, 5: 590000, 6: 788000 } as Record<number, number>
          )[p.id],
          image: 'assets/image/' + p.img,
          groupIds: [names.indexOf(p.cat) + 1],
          standalone: true,
        })),
      };
    }
    const data = await firstValueFrom(
      this.http.get<ApiMenu>(this.url('/api/catalog/branches/' + branchId + '/menu')),
    );
    return {
      groups: data.groups,
      addons: data.addons,
      foods: data.foods.map((p) => ({
        id: p.id,
        name: p.name,
        title: p.title,
        description: p.description,
        price: p.price,
        discountPrice: p.discountPrice,
        remaining: p.remaining,
        standalone: p.canSellStandalone,
        groupIds: data.memberships
          .filter((m) => m.branchFoodId === p.id)
          .map((m) => m.branchGroupId),
        image: p.images.length
          ? this.settings.config().apiBaseUrl.replace(/\/$/, '') + p.images[0]
          : 'assets/image/logo.webp',
      })),
    };
  }
}
