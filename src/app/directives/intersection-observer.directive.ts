import { Directive, ElementRef, input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[InterObs]',
  standalone: true
})
export class IntersectionObserverDirective implements OnInit {
  intersectChild = input(false, {
    transform: (value: string | boolean) => {
      return typeof value === 'string' ? value === '' || value === 'true' : value;
    }
  });
  selfIntersect = input(false, {
    transform: (value: string | boolean) => {
      return typeof value === 'string' ? value === '' || value === 'true' : value;
    }
  });
  obsClass = input('fade-up');
  rootMargin = input('-140px')

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        
        if(!entry.isIntersecting) {
          if(this.intersectChild() === true) {
            this.addClassToChildren('out-of-view');
          }
          this.renderer.addClass(this.el.nativeElement, 'out-of-view')
          return;
        }

        if(entry.isIntersecting) {
          this.renderer.removeClass(this.el.nativeElement, 'out-of-view');
          
          if(this.intersectChild() === true) {
            this.removeClassToChildren('out-of-view');
            this.addClassToChildren(this.obsClass())
            if(this.selfIntersect())
              this.renderer.addClass(this.el.nativeElement, this.obsClass());
            
          } else {
            this.renderer.addClass(this.el.nativeElement, this.obsClass()); // adiciona a classe ao elemento quando está interceptado
          }
        }
        observer.unobserve(this.el.nativeElement); // observar apenas uma vez
      })
    },
    { rootMargin: this.rootMargin() } // margem de distancia para ser interceptado
    )

    observer.observe(this.el.nativeElement);
  }

  private addClassToChildren(className: string){
    const children = this.el.nativeElement.children;
    const childrenArr = Array.from(children);
    childrenArr.forEach((child) => {
      const childElement = child as HTMLElement
      this.renderer.addClass(childElement, className);
    });
  }
  private removeClassToChildren(className: string){
    const children = this.el.nativeElement.children;
    const childrenArr = Array.from(children);
    childrenArr.forEach((child) => {
      const childElement = child as HTMLElement
      this.renderer.removeClass(childElement, className);
    });
  }

}