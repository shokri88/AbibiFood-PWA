# وضعیت واقعی فرانت

## پیاده‌شده در این شروع

- Angular 21.2.25، Routeهای splash، branches، home، menu، food/:id، cart، club و account.
- صفحه/قالب/CSS مستقل برای هر Route و اجزای مشترک جدا.
- انتقال دارایی‌های واقعی، Hasti و style-02.css از قالب مالک؛ نسخه مرجع کامل محفوظ.
- حالت template و api؛ API عمومی branch/menu به مدل UI تبدیل می‌شود.
- نمایش قیمت شعبه و تخفیف، انتخاب افزودنی‌های مجاز API، سبد محلی ترکیبی و badge.
- PWA manifest و Angular service worker برای shell/assets؛ API در dataGroups cache نمی‌شود.
- Build production و ۵ تست StoreService موفق؛ فایل تست در مخزن است.

## عمداً عملیاتی نیست

فروش، پرداخت، ورود مشتری، OTP، باشگاه واقعی، رزرو ظرفیت و ثبت فاکتور. cart یک پیش‌نمایش مرورگر است. routeهای club/account فعلاً مرز فاز بعد و لینک مرجع طراحی دارند.

## محدودیت تأیید

مرور بصری، نصب واقعی PWA، Offline روی دستگاه و اتصال به SQL/API واقعی انجام نشده‌اند. نسخه قبلی HTML تست‌های تاریخی جدا دارد؛ آن‌ها به‌عنوان تست Angular گزارش نمی‌شوند.

نسخه‌های مستقیم در package.json دقیق pin شده و package-lock.json ثبت شده است.
