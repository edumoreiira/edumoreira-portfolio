import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, inject, input, OnInit, PLATFORM_ID, Renderer2 } from "@angular/core";

@Directive({
    selector: '[app-glowing-border]'
})
export class GlowingBorderDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);
    private document = inject(DOCUMENT);
    private observer?: MutationObserver;
    // 
    backgroundColor = input<string>('var(--color-neutral-950)');
    borderColor = input<string>('var(--color-neutral-800)');
    borderWidth = input<string>('1px');
    glowSize = input<string>('800px');
    glowColor = input<string>('hsla(0, 0%, 100%, 0.05)');
    borderGlowColor = input<string>('hsla(0, 0%, 100%, 0.3)');
    borderGlowSize = input<string>('600px');
    group = input.required<string>();
    glowDelay = input<number>(0);
    


  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'gb-wrapper');
    this.applyGlowStyles();
    this.observeDomChanges();
    this.listenMouseMove();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private applyGlowStyles() {
    const elements = this.getGroupElements();
    elements.forEach(el => this.setStyles(el));
  }

  private getGroupElements(): HTMLElement[] {
    return Array.from(
      this.document.querySelectorAll(`[data-gc="${this.group()}"]`)
    ) as HTMLElement[];
  }

  private setStyles(el: HTMLElement) {
    if (!el.classList.contains('gb')) {
      this.renderer.addClass(el, 'gb');
    } 
    el.style.setProperty('--glow-color', this.glowColor());
    el.style.setProperty('--border-glow-color', this.borderGlowColor());
    el.style.setProperty('--border-color', this.borderColor());
    el.style.setProperty('--border-width', this.borderWidth());
    el.style.setProperty('--bg-color', this.backgroundColor());
    el.style.setProperty('--glow-size', this.glowSize());
    el.style.setProperty('--border-glow-size', this.borderGlowSize());
  }

  private observeDomChanges() {
    this.observer = new MutationObserver(() => this.applyGlowStyles());
    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
    });
  }

  private listenMouseMove() {
    this.renderer.listen(this.el.nativeElement, 'mousemove', (event: MouseEvent) => {
      const elements = this.getGroupElements();
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if(this.glowDelay() > 0) {
            setTimeout(() => {
                el.style.setProperty('--mouse-x', `${x}px`);
                el.style.setProperty('--mouse-y', `${y}px`);
            }, this.glowDelay());
        } else {
            el.style.setProperty('--mouse-x', `${x}px`);
            el.style.setProperty('--mouse-y', `${y}px`);
        }
      });
    });
  }
}

@Directive({
    selector: '[app-glowing-border-item]',
})
export class GlowingBorderItemDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);
    group = input.required<string>();
    
    ngOnInit(): void {
        this.renderer.setAttribute(this.el.nativeElement, 'data-gc', this.group());
        this.appendElement('gb__bg');
        this.appendElement('gb__border');
    }

    appendElement(_class: string) {
        if((this.el.nativeElement as HTMLElement).querySelector(`:scope > .${_class}`)) { return }
        const el = this.el.nativeElement as HTMLElement;
        const newElement = this.renderer.createElement('div');
        this.renderer.addClass(newElement, _class);
        this.renderer.appendChild(el, newElement);
    }
}