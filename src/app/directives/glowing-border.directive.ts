import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { Directive, effect, ElementRef, inject, input, OnInit, PLATFORM_ID, Renderer2 } from "@angular/core";

@Directive({
    selector: '[app-glowing-border]'
})
export class GlowingBorderDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);
    private document = inject(DOCUMENT);
    private observer?: MutationObserver;
    private platformId = inject(PLATFORM_ID);
    // 
    backgroundColor = input<string>('var(--color-neutral-950)');
    borderColor = input<string>('var(--color-neutral-800)');
    borderWidth = input<string>('1px');
    glowSize = input<string>('800px');
    glowColor = input<string>('hsla(0, 0%, 100%, 0.05)');
    borderGlowColor = input<string>('hsla(0, 0%, 100%, 0.3)');
    borderGlowSize = input<string>('600px');
    group = input.required<string>();
    glowDelay = input<number>(50);
    

  constructor() {
    effect(() => {
      this.backgroundColor();
      this.borderColor();
      this.borderWidth();
      this.glowSize();
      this.glowColor();
      this.borderGlowColor();
      this.borderGlowSize();
      this.group();

      this.applyGlowStyles();
    });
  }

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
    this.setIfNotExists(el, '--glow-color', this.glowColor());
    this.setIfNotExists(el, '--border-glow-color', this.borderGlowColor());
    this.setIfNotExists(el, '--border-color', this.borderColor());
    this.setIfNotExists(el, '--border-width', this.borderWidth());
    this.setIfNotExists(el, '--bg-color', this.backgroundColor());
    this.setIfNotExists(el, '--glow-size', this.glowSize());
    this.setIfNotExists(el, '--border-glow-size', this.borderGlowSize());
  }
  private setIfNotExists(el: HTMLElement, property: string, value: string) {
    const current = el.style.getPropertyValue(property);
    if (!current) {
      el.style.setProperty(property, value);
    }
  }

  private observeDomChanges() {
    if (!isPlatformBrowser(this.platformId)) return;
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
  // 
  borderGlowColor = input<string | undefined>(undefined);
  borderColor = input<string | undefined>(undefined);
  group = input.required<string>();
  constructor() {
    effect(() => {
      this.updateStyles();
    })
  }
  
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

  private updateStyles() {
    const element = this.el.nativeElement as HTMLElement;
    if(this.borderGlowColor()) {
      element.style.setProperty('--border-glow-color', this.borderGlowColor()!);
    }
    if(this.borderColor()) {
      element.style.setProperty('--border-color', this.borderColor()!);
    } 
  }
}