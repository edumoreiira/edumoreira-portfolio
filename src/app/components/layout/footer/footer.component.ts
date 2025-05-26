import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SocialIconComponent } from "../../shared/social-icon/social-icon.component";
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';
import { IntersectionObserverDirective } from '../../../directives/intersection-observer.directive';

@Component({
  selector: 'footer[app-footer]',
  imports: [SocialIconComponent, IntersectionObserverDirective],
  host: {
    class: 'relative flex flex-col items-center justify-center py-8 border-t border-neutral-900 gap-4 text-center bg-[hsla(0,0%,3.5%)]'
  },
  template: `
    <span class="text-3xl font-medium font-[Kanit] cursor-default">[edumoreira]</span>
    <ul class="flex items-center"
    InterObs intersectChild="true" rootMargin="-80px" obsClass="fadeIn">
        <li class="delay-1"> <app-social-icon icon="ri-instagram-fill text-xl" url="https://www.instagram.com/edumoreira.dev/" description="Instagram"/> </li>
        <li aria-hidden="true" class="delay-1 h-px xs:w-[1.5rem] w-[1rem] bg-neutral-900"></li>
        <li class="delay-2"> <app-social-icon icon="flex fi fi-brands-behance" url="https://www.behance.net/eduumoreira" description="Behance"/> </li>
        <li aria-hidden="true" class="delay-2 h-px xs:w-[1.5rem] w-[1rem] bg-neutral-900"></li>
        <li class="delay-3"> <app-social-icon icon="flex fi fi-brands-twitter-alt-circle" url="https://x.com/edumoreira_dev" description="Twitter"/> </li>
        <li aria-hidden="true" class="delay-3 h-px xs:w-[1.5rem] w-[1rem] bg-neutral-900"></li>
        <li class="delay-4"> <app-social-icon icon="ri-linkedin-fill text-lg" description="Linkedin"/> </li>
        <li aria-hidden="true" class="delay-4 h-px xs:w-[1.5rem] w-[1rem] bg-neutral-900"></li>
        <li class="delay-5"> <app-social-icon icon="fi fi-brands-github flex" url="https://github.com/edumoreiira" description="Github"/> </li>
        <li aria-hidden="true" class="delay-5 h-px xs:w-[1.5rem] w-[1rem] bg-neutral-900"></li>
        <li class="delay-5"> <app-social-icon icon="fi fi-sr-envelope-plus flex" url="mailto:edumoreira.dev@gmail.com" description="Email"/> </li>
    </ul>
    <p class="text-neutral-300 text-sm delay-8">{{ lg().footer.copyright }}</p>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected lg = inject(LANGUAGE_APPLICATION);
}
