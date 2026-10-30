# فایل‌ها و وظایف فرانت

| فایل/بخش                       | وظیفه و وابستگی                                                      |
| ------------------------------ | -------------------------------------------------------------------- |
| src/main.ts                    | راه‌اندازی Angular                                                   |
| app.config.ts                  | Router، HttpClient، AppInitializer تنظیمات و service worker          |
| app.routes.ts                  | هشت Route lazy و fallback خانه                                       |
| app.html/app.ts                | Shell، نشان سبد و وضعیت online                                       |
| core/settings.service.ts       | بارگذاری دو JSON عمومی؛ خطای config بدون fallback پنهان              |
| core/catalog.service.ts        | branches/menu، نگاشت API و داده نمونه                                |
| core/models.ts                 | قرارداد UI برای Food/Menu/Addon/CartLine                             |
| core/store.service.ts          | branch/cart signals، ادغام ترکیب یکسان، تعداد و ذخیره sessionStorage |
| shared/food-card               | نمایش reusable کارت؛ انتخاب به route جزئیات                          |
| pages/splash                   | انیمیشن و انتقال با رعایت reduced-motion                             |
| pages/branches                 | انتخاب شعبه و تأیید پاک‌کردن سبد هنگام تغییر                         |
| pages/home                     | بنر دستی، پیشنهادها، تخفیف‌ها و چیدمان نمونه پرفروش                  |
| pages/menu                     | فیلتر گروه و جست‌وجوی فارسی                                          |
| pages/product                  | افزودنی مجاز همان شعبه و جمع پیش‌نمایش                               |
| pages/cart                     | ردیف ترکیبی و افزایش/کاهش؛ فاقد checkout عملیاتی                     |
| pages/club,account             | مرز فاز مشتری و لینک مرجع شخصی‌سازی‌شده                              |
| core/store.service.spec.ts     | پنج تست ترکیب/تعداد/شعبه                                             |
| public/assets/config           | تنظیمات و متن‌های عمومی                                              |
| public/assets/css              | style-02.css و hasti.css اصلی مالک                                   |
| template-reference/ORIGIN.json | provenance قالب                                                      |

حد ۲۰ عدد در StoreService انتخاب نمایشی باقی‌مانده از قالب است، نه سیاست فروش تأییدشده. افزودنی فعلی در Angular برای هر ردیف صفر/یک انتخاب می‌شود؛ maxQuantity API برای توسعه تعداد در فاز فروش محفوظ است.
