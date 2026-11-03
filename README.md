# آبی‌بی — فرانت Angular/PWA

شروع فاز یک سامانه چندشعبه‌ای آبی‌بی. مخزن همراه: [shokri88/AbibiFood-NetCore](https://github.com/shokri88/AbibiFood-NetCore). مرجع قالب شخصی‌سازی‌شده: [AbibiFood-UI](https://github.com/shokri88/AbibiFood-UI) در `2af3cb18ef8c3de657fe2284db0209379fc2ee09`.

**شروع انتقال به انسان یا AI جدید:** [AI-HANDOVER-fa.md](docs/AI-HANDOVER-fa.md) و [AGENTS.md](AGENTS.md).

Angular 21.2.25، TypeScript، Bootstrap RTL، فونت Hasti و PWA؛ هشت Route اولیه. مرجع کامل ۲۰ صفحه HTML در template-reference محفوظ است. این نسخه فروش و احراز هویت مشتری ندارد؛ پیش‌فرض از API در https://localhost:7043 می‌خواند.

```sh
npm ci
npm start
npm test -- --watch=false
npm run build
```

برای اتصال API، mode=api و apiBaseUrl را در public/assets/config/app-config.json تنظیم کنید. خروجی انتشار dist/AbibiFood-PWA/browser است. جزئیات در راهنمای اجرا آمده است.

## اسناد

- [AI-HANDOVER-fa.md](docs/AI-HANDOVER-fa.md)
- [PROJECT-HISTORY-fa.md](docs/PROJECT-HISTORY-fa.md)
- [PROJECT-STATUS-fa.md](docs/PROJECT-STATUS-fa.md)
- [ARCHITECTURE-fa.md](docs/ARCHITECTURE-fa.md)
- [MODULES-fa.md](docs/MODULES-fa.md)
- [BUSINESS-RULES-fa.md](docs/BUSINESS-RULES-fa.md)
- [DATABASE-API-fa.md](docs/DATABASE-API-fa.md)
- [CONFIGURATION-fa.md](docs/CONFIGURATION-fa.md)
- [SETUP-DEPLOY-fa.md](docs/SETUP-DEPLOY-fa.md)
- [DECISIONS-fa.md](docs/DECISIONS-fa.md)
- [ROADMAP-fa.md](docs/ROADMAP-fa.md)
- [CHANGELOG-fa.md](docs/CHANGELOG-fa.md)
- [KNOWN-ISSUES-fa.md](docs/KNOWN-ISSUES-fa.md)

## وضعیت اعتبارسنجی

Build production و ۱۸ تست موفق؛ چیدمان شعبه، قاب تصاویر و پیشنهاد جایگزین در مرورگر نیز بررسی شده‌اند. بررسی بصری/نصب واقعی PWA و اتصال end-to-end هنوز انجام نشده.
