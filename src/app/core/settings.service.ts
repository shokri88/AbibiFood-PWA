import { Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly config = signal({
    mode: 'template' as 'template' | 'api',
    apiBaseUrl: '',
    brandName: 'آبی‌بی',
  });
  readonly messages = signal<Record<string, string>>({});
  async load(): Promise<void> {
    const [c, m] = await Promise.all([
      fetch('assets/config/app-config.json'),
      fetch('assets/config/messages.fa.json'),
    ]);
    if (!c.ok || !m.ok) throw new Error('تنظیمات برنامه بارگذاری نشد.');
    const config = await c.json();
    if (!['template', 'api'].includes(config.mode)) throw new Error('mode نامعتبر است.');
    if (config.mode === 'api' && !/^https?:\/\//.test(config.apiBaseUrl))
      throw new Error('apiBaseUrl نامعتبر است.');
    this.config.set(config);
    this.messages.set(await m.json());
  }
  text(key: string): string {
    return this.messages()[key] || key;
  }
}
