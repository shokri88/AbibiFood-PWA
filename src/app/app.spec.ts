import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { describe, it, expect } from 'vitest';
import { App } from './app';
@Component({template: ''})
class TestPage {}

describe('قاب صفحه آغاز', () => {
  it('در ریشه هدر و منوی پایین و فاصله را حذف و پس از خروج بازمی‌گرداند', async () => {
    TestBed.configureTestingModule({imports: [App], providers: [provideRouter([
      {path: '', component: TestPage, pathMatch: 'full'}, {path: 'home', component: TestPage},
    ])]});
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    fixture.componentInstance.online.set(false);
    await router.navigateByUrl('/?welcome=1');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.offline-banner')).toBeNull();
    expect(fixture.nativeElement.querySelector('.site-header')).toBeNull();
    expect(fixture.nativeElement.querySelector('.bottom-nav')).toBeNull();
    expect(fixture.nativeElement.querySelector('main').className).toBe('splash-content');
    await router.navigateByUrl('/home');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.offline-banner')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.site-header')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.bottom-nav')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('main').classList.contains('container-xxl')).toBe(true);
  });
});
