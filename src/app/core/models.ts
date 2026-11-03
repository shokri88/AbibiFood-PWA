export interface Branch {
  id: number;
  name: string;
  address?: string;
  area?: string;
  description?: string;
}
export interface Food {
  id: number;
  name: string;
  title?: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  image: string;
  images?: string[];
  groupIds: number[];
  remaining?: number;
  standalone: boolean;
}
export interface Group {
  id: number;
  title: string;
}
export interface Addon {
  id: number;
  parentBranchFoodId: number;
  addonBranchFoodId: number;
  maxQuantity: number;
}
export interface Menu {
  foods: Food[];
  groups: Group[];
  addons: Addon[];
}
export interface CartLine {
  foodId: number;
  quantity: number;
  addonIds: number[];
}
