import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserPreferenceService } from "../services/user-preference.service";

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  private router = inject(Router);
  private userPreference = inject(UserPreferenceService);
  // 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const childRoute = route.firstChild; // verifies if there's a child route, e.g., home/{route}
    if (childRoute) {
      const view = childRoute.routeConfig?.path;
      if (view === 'freelancer' || view === 'developer') {
        this.userPreference.setHomeView(view);
        return true;
      }
    }

    // if navigating to /home without a child, check for a saved preference
    const lastView = this.userPreference.homeView$();
    const lang = route.parent?.params['lang'];

    if (lastView) { // redirect to the last saved view
      return this.router.createUrlTree([`/${lang}/home/${lastView}`]);
    }

    // if no preference, redirect to /home by default
    return true;
  }

}
