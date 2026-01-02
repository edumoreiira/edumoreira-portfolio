// src/app/directives/glowing-border.directive.ts

import { isPlatformBrowser } from '@angular/common';
import {
  ContentChildren,
  Directive,
  ElementRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  effect,
  AfterContentInit,
} from '@angular/core';

@Directive({
  selector: '[app-glowing-border-item]',
  standalone: true,
})
export class GlowingBorderItemDirective implements OnInit {
  readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  borderGlowColor = input<string>();
  borderColor = input<string>();
  glowColor = input<string>();
  backgroundColor = input<string>();
  
  // public properties for the "parent" directive to control the animation
  public targetX = 0;
  public targetY = 0;
  public currentX = 0;
  public currentY = 0;
  
  constructor() {
    effect(() => {
      // ssr safe: only manipulate styles on browser
      if (isPlatformBrowser(this.platformId)) {
        const el = this.elementRef.nativeElement;
        
        this.updateStyle(el, '--glow-color', this.glowColor());
        this.updateStyle(el, '--border-glow-color', this.borderGlowColor());
        this.updateStyle(el, '--border-color', this.borderColor());
        this.updateStyle(el, '--bg-color', this.backgroundColor());
      }
    });
  }

  ngOnInit(): void {
    // ssr safe: only manipulate dom on browser
    if (isPlatformBrowser(this.platformId)) {
      const el = this.elementRef.nativeElement;
      // logic to add glow elements
      if (!el.querySelector(':scope > .gb__bg')) {
        const bg = document.createElement('div');
        bg.className = 'gb__bg';
        el.prepend(bg);
      }
      if (!el.querySelector(':scope > .gb__border')) {
        const border = document.createElement('div');
        border.className = 'gb__border';
        el.prepend(border);
      }
    }
  }

  private updateStyle(element: HTMLElement, style: string, value: string | undefined): void {
    if (value) {
      element.style.setProperty(style, value);
    } else {
      element.style.removeProperty(style);
    }
  }
}

@Directive({
  selector: '[app-glowing-border]',
  standalone: true,
})
export class GlowingBorderDirective implements OnInit, OnDestroy, AfterContentInit {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);

  // properties for the animation loop
  private animationFrameId: number | null = null;
  private listeners: (() => void)[] = [];

  // store last known mouse position to use during scroll events
  // necessary to fix the issue where scroll didn't update glow position
  private lastX = 0;
  private lastY = 0;

  // inputs for the parent directive
  backgroundColor = input<string>('var(--color-neutral-950)');
  borderColor = input<string>('var(--color-neutral-800)');
  borderWidth = input<string>('1px');
  glowSize = input<string>('800px');
  glowColor = input<string>('hsla(0, 0%, 100%, 0.05)');
  borderGlowColor = input<string>('hsla(0, 0%, 100%, 0.3)');
  borderGlowSize = input<string>('600px');
  
  // 'glowdelay' now controls the "smoothness" of the trail.
  // higher values = longer trail. a good value to test is between 5 and 20.
  glowDelay = input<number>(7);

  @ContentChildren(GlowingBorderItemDirective, { descendants: true })
  private readonly items!: QueryList<GlowingBorderItemDirective>;

  constructor() {
    // effect to apply container styles whenever the parent's inputs change.
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const el = this.el.nativeElement;
        el.style.setProperty('--glow-color', this.glowColor());
        el.style.setProperty('--border-glow-color', this.borderGlowColor());
        el.style.setProperty('--border-color', this.borderColor());
        el.style.setProperty('--border-width', this.borderWidth());
        el.style.setProperty('--bg-color', this.backgroundColor());
        el.style.setProperty('--glow-size', this.glowSize());
        el.style.setProperty('--border-glow-size', this.borderGlowSize());
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.classList.add('gb-wrapper');
    }
    this.setupListeners();
  }

  ngAfterContentInit() {
    this.addGbClassToItems();
    this.items.changes.subscribe(() => this.addGbClassToItems());
  }

  ngOnDestroy() {
    // removes all listeners and stops the animation
    this.listeners.forEach(remove => remove());
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  
  private addGbClassToItems(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.items.forEach(item => {
        item.elementRef.nativeElement.classList.add('gb');
      });
    }
  }
  
  private setupListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // runs listeners outside angular zone to avoid change detection on every mouse move
    this.zone.runOutsideAngular(() => {
      const hostElement = this.el.nativeElement;

      // reuse calculation logic for both mousemove and scroll
      const calculateTargets = (clientX: number, clientY: number) => {
        this.items.forEach(item => {
          const rect = item.elementRef.nativeElement.getBoundingClientRect();
          item.targetX = clientX - rect.left;
          item.targetY = clientY - rect.top;
        });
      };

      const onMouseMove = (event: MouseEvent) => {
        // saves global coordinates to be used by the scroll listener
        this.lastX = event.clientX;
        this.lastY = event.clientY;

        // only updates the target coordinates
        calculateTargets(this.lastX, this.lastY);
      };
      
      // handler for scroll using last known coordinates
      const onScroll = () => {
        calculateTargets(this.lastX, this.lastY);
      };

      // starts the animation loop when the mouse enters the area
      const onMouseEnter = (event: MouseEvent) => { 
        // capture immediate position to avoid 0px bug
        this.lastX = event.clientX;
        this.lastY = event.clientY;
        calculateTargets(this.lastX, this.lastY);

        // snap current to target immediately to prevent "fly-in" from 0px
        this.items.forEach(item => {
          item.currentX = item.targetX;
          item.currentY = item.targetY;
          // manually update styles immediately for the first frame
          const el = item.elementRef.nativeElement;
          el.style.setProperty('--mouse-x', `${item.currentX}px`);
          el.style.setProperty('--mouse-y', `${item.currentY}px`);
        });

        this.startAnimationLoop(); 
        
        // add scroll listener only when hovering (performance optimization)
        window.addEventListener('scroll', onScroll, { capture: true, passive: true });
      };
      
      // stops the animation loop when the mouse leaves
      const onMouseLeave = () => { 
        this.stopAnimationLoop(); 
        // remove scroll listener when leaving
        window.removeEventListener('scroll', onScroll, { capture: true } as any);
      };

      hostElement.addEventListener('mousemove', onMouseMove);
      hostElement.addEventListener('mouseenter', onMouseEnter);
      hostElement.addEventListener('mouseleave', onMouseLeave);

      // stores the functions to be able to remove them later
      this.listeners.push(
        () => hostElement.removeEventListener('mousemove', onMouseMove),
        () => hostElement.removeEventListener('mouseenter', onMouseEnter),
        () => hostElement.removeEventListener('mouseleave', onMouseLeave),
        // ensure cleanup if component is destroyed while hovering
        () => window.removeEventListener('scroll', onScroll, { capture: true } as any)
      );
    });
  }

  private startAnimationLoop(): void {
    if (this.animationFrameId) return; // already running
    const animate = () => {
      // calculates the smoothing factor. a smaller value makes the trail longer.
      const easingFactor = 1 / (this.glowDelay() || 1);
      this.items.forEach(item => {
        // moves the current position a bit towards the target
        item.currentX += (item.targetX - item.currentX) * easingFactor;
        item.currentY += (item.targetY - item.currentY) * easingFactor;
        
        // updates the css variables with the current (interpolated) position
        const el = item.elementRef.nativeElement;
        el.style.setProperty('--mouse-x', `${item.currentX}px`);
        el.style.setProperty('--mouse-y', `${item.currentY}px`);
      });
      // continues the loop on the next frame
      this.animationFrameId = requestAnimationFrame(animate);
    };
    // starts the loop
    this.animationFrameId = requestAnimationFrame(animate);
  }

  private stopAnimationLoop(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}