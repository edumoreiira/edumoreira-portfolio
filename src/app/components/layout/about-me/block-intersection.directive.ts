// animate-on-scroll.directive.ts
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Output,
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
  @Output() visible = new EventEmitter<void>();

  readonly isVisible = signal(false);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const el = this.elementRef.nativeElement as HTMLElement;
      const height = el.offsetHeight;
      
      // adjust threshold based on element height
      const threshold = height > 320 ? 0.3 : 0.6; // 30% for taller elements, 60% for shorter ones


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
    }
  }
}