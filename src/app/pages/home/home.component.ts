import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LANGUAGE_APPLICATION } from '../../tokens/language.tokens';
import { ButtonComponent } from '../../components/base/button.component';
import { createAnimation } from '../../animations/default-transitions.animations';
import { IntersectionObserverDirective } from '../../directives/intersection-observer.directive';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, IntersectionObserverDirective, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    createAnimation('fadeInUp', { transform: 'translateY(3rem)', duration: '700ms' })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  protected lg = inject(LANGUAGE_APPLICATION);
  // Methods
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }


}
