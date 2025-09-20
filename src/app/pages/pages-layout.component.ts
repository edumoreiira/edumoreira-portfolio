import { Component } from "@angular/core";
import { NavbarComponent } from "../components/layout/navbar/navbar.component";
import { FooterComponent } from "../components/layout/footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { IntersectionObserverDirective } from "../directives/intersection-observer.directive";

@Component({
  selector: 'app-pages-layout',
  template: `
  <app-navbar/>
  <router-outlet></router-outlet>
  <footer class="mt-auto" app-footer InterObs intersectChild="true"></footer>
  `,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, IntersectionObserverDirective]
})
export class PagesLayoutComponent { }