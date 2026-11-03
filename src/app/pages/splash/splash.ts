import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-splash-page', imports: [RouterLink],
  templateUrl: './splash.html', styleUrl: './splash.css',
})
export class SplashPage {
  private router = inject(Router);
  constructor() {
    const timer = setTimeout(() => this.router.navigateByUrl('/branches', { replaceUrl: true }),
      matchMedia('(prefers-reduced-motion:reduce)').matches ? 400 : 1800);
    inject(DestroyRef).onDestroy(() => clearTimeout(timer));
  }
}
