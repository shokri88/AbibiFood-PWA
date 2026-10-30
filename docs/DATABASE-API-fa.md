# قرارداد مصرفی فرانت

هیچ جدول SQL در این مخزن نیست. قرارداد واقعی سرور در مخزن همراه و `Models/CatalogInputs.cs`/`PublicCatalogController.cs` است.

- GET `/api/catalog/branches`: شعبه‌های فعال، id/name/address/description/latitude/longitude.
- GET `/api/catalog/branches/{branchId}/menu?date=yyyy-MM-dd`: groups، memberships، addons، hours، foods، currency=TOMAN و orderingEnabled=false.
- شناسه Food در UI عملیاتی همان BranchFood.Id است؛ FoodId مخزن با آن یکی نیست.
- images مسیر نسبی API است؛ apiBaseUrl به آن افزوده می‌شود. قیمت و discountPrice به تومان‌اند.
- remaining عدد موجودی روز منتخب است؛ نبود ظرفیت یعنی صفر. فرانت هنوز رزرو ایجاد نمی‌کند.
- addon.parentBranchFoodId و addon.addonBranchFoodId به اقلام همان منو اشاره می‌کنند.
- در mode=api شکست سرور خطا نمایش می‌دهد؛ داده نمونه جایگزین نمی‌شود.

کلیدهای محلی: sessionStorage `abibi.branch` و `abibi.cart`. داده‌های قدیمی `abibi-ui-v3` متعلق به مرجع HTML هستند و خودکار به Angular مهاجرت نمی‌کنند.
