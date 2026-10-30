import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StoreService } from './core/store.service';
import { SettingsService } from './core/settings.service';
@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
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
