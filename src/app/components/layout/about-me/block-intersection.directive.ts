// animate-on-scroll.directive.ts
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  output,
  PLATFORM_ID,
  signal
} from '@angular/core';

@Directive({
  selector: '[blockIntersection]',
  standalone: true,
  host: {
    '[class.is-visible]': 'isVisible()',
  }
})
export class BlockIntersectionDirective implements AfterViewInit {
  private elementRef = inject(ElementRef<HTMLElement>);
  private platformId = inject(PLATFORM_ID);

  // output that emits when the element becomes visible
  visible = output<void>();

  readonly isVisible = signal(false);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const el = this.elementRef.nativeElement as HTMLElement;
        const height = el.offsetHeight;
        
        // adjust threshold based on element height
        const threshold = height > 300 ? 0.35 : 0.7; // 35% for taller elements, 70% for shorter ones
  
  
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.isVisible.set(true);
                // emit the event to the parent component
                this.visible.emit();
                observer.unobserve(this.elementRef.nativeElement);
              }
            });
          },
          { threshold }
        );
  
        observer.observe(el);
      });
    }
  }
}