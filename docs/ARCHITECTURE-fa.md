# معماری فرانت

`main.ts → app.config.ts → SettingsService.load → App/Shell → Router → Page → CatalogService → API`

رابطه داده: کاتالوگ API → مدل Food/Group/Addon → صفحه جزئیات → StoreService → sessionStorage. هیچ اتصال مستقیم به دیتابیس یا قراردادن JWT در فایل تنظیمات وجود ندارد.

در حالت template داده از `core/template-data.ts` است. در حالت api، HttpClient فقط GET کاتالوگ را می‌خواند. Shell مشترک header و bottom-nav دارد. صفحه‌های lazy در `pages/` و card در `shared/food-card/` هستند. Bootstrap RTL از فایل محلی وارد styles می‌شود.

`template-reference/` خروجی بدون تغییر Git قالب در SHA مبناست و جزو کد Angular نیست. angular.json پوشه dist آن را به مسیر template-reference/dist خروجی کپی می‌کند تا طرح کامل قابل مشاهده بماند. legacy JavaScript فقط در آن صفحات مستقل اجرا می‌شود.

PWA shell و assets را cache می‌کند؛ ظرفیت و API عمداً cache آفلاین ندارند. در وضعیت offline هشدار نمایش داده می‌شود و خرید عملیاتی وجود ندارد.
