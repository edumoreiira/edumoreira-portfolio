import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, inject, input, OnInit, PLATFORM_ID, Renderer2 } from "@angular/core";

@Directive({
    selector: '[app-glowing-border]'
})
export class GlowingBorderDirective implements OnInit {
    private el = inject(ElementRef);
    private renderer = inject(Renderer2);
    private document = inject(DOCUMENT);
    // 
    backgroundColor = input<string>('hsla(0, 0%, 4%)');
    borderColor = input<string>('hsla(0, 0%, 8%)');
    borderWidth = input<string>('1px');
    glowSize = input<string>('800px');
    glowColor = input<string>('hsla(0, 0%, 100%, 0.05)');
    borderGlowColor = input<string>('hsla(0, 0%, 100%, 0.3)');
    borderGlowSize = input<string>('600px');
    group = input.required<string>();
    

    ngOnInit() {
        const elements = this.document.querySelectorAll(`[data-gc="${this.group()}"]`);
        setTimeout(() => {
            elements.forEach((element: Element) => { 
                this.addClasses(element) 
            });
        });
        this.renderer.addClass(this.el.nativeElement, 'gb-wrapper');

        this.renderer.listen(this.el.nativeElement, 'mousemove', (event: MouseEvent) => {
            elements.forEach((element: Element) => {
                const rect = element.getBoundingClientRect();
                const x = event.clientX - rect.left; // x position within the element
                const y = event.clientY - rect.top;  // y position within the element
                const htmlElement = element as HTMLElement;
                htmlElement.style.setProperty('--mouse-x', `${x}px`);
                htmlElement.style.setProperty('--mouse-y', `${y}px`);
            })
        });
    }

    addClasses(element: Element) {
        const el = element as HTMLElement;
        if (!el.classList.contains('gb')) {
            this.renderer.addClass(element, 'gb');
        }
        el.style.setProperty('--glow-color', this.glowColor());
        el.style.setProperty('--border-glow-color', this.borderGlowColor());
        el.style.setProperty('--border-color', this.borderColor());
        el.style.setProperty('--border-width', this.borderWidth());
        el.style.setProperty('--bg-color', this.backgroundColor());
        el.style.setProperty('--glow-size', this.glowSize());
        el.style.setProperty('--border-glow-size', this.borderGlowSize());
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
        // if (isPlatformBrowser(this.platformId)) { // Ensure this runs only in the browser
        this.renderer.setAttribute(this.el.nativeElement, 'data-gc', this.group());
        this.appendElement('gb__bg', this.el);
        this.appendElement('gb__border', this.el);
    }

    appendElement(_class: string, element: ElementRef) {
        if((this.el.nativeElement as HTMLElement).querySelector(':scope > .gb__bg')) { return }
        const el = this.el.nativeElement as HTMLElement;
        const newElement = this.renderer.createElement('div');
        this.renderer.addClass(newElement, _class);
        this.renderer.appendChild(el, newElement);
    }
}