# تنظیمات فرانت

`public/assets/config/app-config.json` عمومی است: mode=template یا api، apiBaseUrl و brandName. پیش‌فرض template است. برای اتصال محلی، mode را api و base را https://localhost:7043 بگذارید.

`public/assets/config/messages.fa.json` متن‌های عمومی فعلی را دارد؛ هنوز همه متن‌های template و کامپوننت‌ها به آن منتقل نشده‌اند. `core/template-data.ts` داده نمونه دارد و نباید منبع قیمت عملیاتی تلقی شود.

`assets/css/hasti.css`: خانواده فونت و OpenType settings؛ تغییر مدل از --abibi-font-family. فایل اصلی style-02.css و فونت‌ها از مالک منتقل شده‌اند.

`ngsw-config.json`: فقط assetGroups؛ هیچ API/توکن در cache تعریف نشده. `proxy.conf.json` فقط نمونه dev با secure=false برای گواهی localhost است؛ در production استفاده نشود.

نسخه‌ها دقیق در package.json/package-lock.json و Node در .node-version. Angular/Bootstrap/runtime config عمومی‌اند و هیچ secret نباید در آن‌ها قرار گیرد. تنظیمات مدیریتی سامانه و secret پیامک/پرداخت متعلق به بک‌اند آینده‌اند.

## فونت سبک‌تر و پاپ‌آپ کارت

CSS فونت فرانت همچنان `public/assets/css/hasti.css` است. فایل‌های فعلی فقط Hasti Heavy هستند؛ برای درخواست وزن سبک‌تر باید فایل قانونی Regular/Medium در اختیار پروژه قرار گیرد و @font-face همان CSS تکمیل شود. از ثبت وزن صوری ۴۰۰ برای فایل Heavy به‌عنوان رفع مشکل خودداری کنید. وزن سبک‌تر هنوز اعمال نشده است؛ فونت بک‌اند وزیر باقی است.

پاپ‌آپ افزودنی کتابخانه خارجی ندارد و از dialog بومی مرورگر استفاده می‌کند. در حالت API به menu.addons و غذاهای همان پاسخ وابسته است. در حالت template نمونه‌ها در TEMPLATE_DATA.addons قرار دارند.

## تنظیم فعلی اتصال و تصاویر — ۲۰۲۶-۱۱-۰۳

پیش‌فرض public/assets/config/app-config.json اکنون api با آدرس https://localhost:7043 است، مطابق اجرای فرانت کاربر روی http://localhost:4200. برای استقرار، apiBaseUrl را به سرور واقعی تغییر دهید؛ localhost روی دستگاه هر بازدیدکننده همان دستگاه است. تصویر گروه از imagePath پاسخ API دریافت می‌شود. آیکن‌ها و فونت Font Awesome محلی‌اند و به CDN متکی نیستند. پرفروش‌ترین‌ها فقط با bestSellerIds غیرخالی سرور نشان داده می‌شوند.

## پیشنهاد ویژه و بنر قابل تنظیم

برای نمایش پیشنهاد ویژه، مدیر از منوی «صفحه اصلی شعبه ← پیشنهادهای ویژه» غذاها را انتخاب کند. برای باکس قرمز از «بنرهای صفحه اصلی» عنوان، متن، تصویر و غذای مقصد را ثبت کند. داده از specialFoodIds و banners API می‌آید؛ در نبود تنظیم، عکس غذا یا شعار ثابت جایگزین نمی‌شود. فقط بنر/پیشنهاد فعال با غذای فعال و مستقل همان شعبه منتشر می‌شود. لینک تصویر و دکمه به /food/{branchFoodId} است. فرانت جدید به Migration BranchHomeContent در بک‌اند نیاز دارد.
