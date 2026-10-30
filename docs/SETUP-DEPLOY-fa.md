# اجرا، تست و انتشار فرانت

نیاز: Node 24.22.1 و npm؛ نصب دقیق وابستگی از lock:

```sh
npm ci
npm start
npm test -- --watch=false
npm run build
```

نشانی توسعه http://localhost:4200 . برای استفاده از API ابتدا بک‌اند را طبق سند همراه روی HTTPS اجرا و گواهی localhost را اعتماد کنید، سپس mode=api را در JSON تنظیم کنید.

خروجی انتشار `dist/AbibiFood-PWA/browser` است. روی هاست static با HTTPS قرار دهید؛ مسیرهای Angular باید به index.html rewrite شوند، اما مسیر assets و template-reference باید فایل واقعی را برگرداند. index.html/ngsw.json نباید cache طولانی داشته باشند؛ assetهای hashدار می‌توانند cache طولانی داشته باشند.

PWA در build production فعال است؛ ng serve معمولی service worker را فعال نمی‌کند. نصب/آفلاین باید با مرورگر واقعی و HTTPS بررسی شود. تنظیم CORS در سرور باید origin واقعی این برنامه باشد.

CI در `.github/workflows/ci.yml` npm ci، پنج تست و build را اجرا می‌کند؛ نتیجه محلی ثبت شده و نتیجه اجرای GitHub هنوز مشاهده نشده است. deploy خودکار و دامنه production تنظیم نشده‌اند.
