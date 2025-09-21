import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { LANGUAGE_APPLICATION } from '../../tokens/language.tokens';
import { ButtonComponent } from '../../components/base/button.component';
import { createAnimation } from '../../animations/default-transitions.animations';
import { IntersectionObserverDirective } from '../../directives/intersection-observer.directive';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { EmButtonToggleGroupComponent } from '../../components/shared/button-toggle/em-button-toggle-group.component';
import { EmButtonToggleDirective } from '../../components/shared/button-toggle/em-button-toggle.directive';
import { EmButtonToggleAnimationDirective } from '../../components/shared/button-toggle/em-button-toggle-animation.directive';
import { HomeView, UserPreferenceService } from '../../services/user-preference.service';
import { FormsModule } from '@angular/forms';
import { filter, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [IntersectionObserverDirective, RouterOutlet, EmButtonToggleGroupComponent,
    EmButtonToggleDirective, EmButtonToggleAnimationDirective, FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    createAnimation('fadeInUp', { transform: 'translateY(3rem)', duration: '700ms' }),
    createAnimation('textAnimate', { animateY: true,  transform: 'translateY(2rem)', duration: '500ms' }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  protected lg = inject(LANGUAGE_APPLICATION);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly userPreference = inject(UserPreferenceService)
  // 
  homePageSelector = signal<HomeView | ''>('');

  changeRoute = effect(() => {
    const route = this.homePageSelector();
    if(route) {
      this.router.navigate([route], { relativeTo: this.route })
      this.userPreference.setHomeView(route);
    }
  })

  constructor() {
    // this code will update signal homePageSelector when routes changes between /developer - /freelancer
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null), //starts with null, forcing subscribe when page loads for the first time.
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      const childRoute = this.route.firstChild;
      if (childRoute) {
        const currentView = childRoute.snapshot.url[0]?.path as HomeView;
        // prevents infinite loop with effect
        if(currentView && this.homePageSelector() !== currentView) {
          this.homePageSelector.set(currentView);
        }
      }
    });
  }





  
  // Methods


  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }


}
