import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { NavbarComponent } from "../components/layout/navbar/navbar.component";
import { FooterComponent } from "../components/layout/footer/footer.component";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { IntersectionObserverDirective } from "../directives/intersection-observer.directive";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { filter, map } from "rxjs";

@Component({
  selector: 'app-pages-layout',
  template: `
  <app-navbar/>
  <router-outlet></router-outlet>
  @if(isHomePage() === false) {
    <footer class="mt-auto" app-footer InterObs intersectChild="true"></footer>
  }
  `,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, IntersectionObserverDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesLayoutComponent {
  router = inject(Router);
  private currentUrl = toSignal(this.router.events
    .pipe(
      takeUntilDestroyed(),
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.url)
    ), { initialValue: this.router.url }
  );

  protected isHomePage = computed(() => {
    return this.currentUrl().endsWith('/home')
  })
 }