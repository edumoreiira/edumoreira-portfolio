import { Directive, ElementRef, inject, OnDestroy, OnInit, output, signal } from "@angular/core";

@Directive({
  selector: '[ViewportChecker]'
})
export class ViewportCheckerDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  // 
  private observer?: IntersectionObserver;
  // 
  viewportChange = output<boolean>();

  ngOnInit(): void {
    this.observeElement();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private handleIntersect = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0]; // get first element of list
    const isVisible = entry.isIntersecting;
    this.viewportChange.emit(isVisible);
  }

  private observeElement() {
    const hostElement = this.el.nativeElement;
    const options = { threshold: 0 };
    this.observer = new IntersectionObserver(this.handleIntersect, options);
    
    this.observer.observe(hostElement);
  }
}