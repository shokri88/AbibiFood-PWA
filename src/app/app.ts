import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { Component, inject, signal, computed, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StoreService } from './core/store.service';
import { SettingsService } from './core/settings.service';
@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);
  private currentUrl = toSignal(this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(event => event.urlAfterRedirects), startWith(this.router.url),
  ), { initialValue: '/' });
  isEntryPage = computed(() => ['/', '/branches'].includes(this.currentUrl().split(/[?#]/)[0]));
  store = inject(StoreService);
  settings = inject(SettingsService);
  online = signal(navigator.onLine);
  @HostListener('window:online') onOnline() {
    this.online.set(true);
  }
  @HostListener('window:offline') onOffline() {
    this.online.set(false);
  }
}
