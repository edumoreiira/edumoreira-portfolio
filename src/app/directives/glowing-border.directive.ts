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
} from '@angular/core';

@Directive({
  selector: '[app-glowing-border-item]',
  standalone: true,
})
export class GlowingBorderItemDirective implements OnInit {
  borderGlowColor = input<string>();
  borderColor = input<string>();
  glowColor = input<string>();
  
  // public properties for the "parent" directive to control the animation
  public targetX = 0;
  public targetY = 0;
  public currentX = 0;
  public currentY = 0;
  
  readonly elementRef = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    if(typeof window !== 'undefined') { // avoid running on server
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

  // method for the "parent" to apply styles
  public setStyles(defaults: { [key: string]: string }): void {
    const el = this.elementRef.nativeElement as HTMLElement;
    el.style.setProperty('--glow-color', this.glowColor() ?? defaults['--glow-color']);
    el.style.setProperty('--border-glow-color', this.borderGlowColor() ?? defaults['--border-glow-color']);
    el.style.setProperty('--border-color', this.borderColor() ?? defaults['--border-color']);
  }
}

@Directive({
  selector: '[app-glowing-border]',
  standalone: true,
})
export class GlowingBorderDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);

  // properties for the animation loop
  private animationFrameId: number | null = null;
  private listeners: (() => void)[] = [];

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

  ngOnInit() {
    this.el.nativeElement.classList.add('gb-wrapper');
    this.setupListeners();
  }

  ngAfterContentInit() {
    this.applyStylesToItems();
    this.items.changes.subscribe(() => this.applyStylesToItems());
  }

  ngOnDestroy() {
  // removes all listeners and stops the animation
    this.listeners.forEach(remove => remove());
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private applyStylesToItems(): void {
    this.items.forEach((item) => {
      const el = item.elementRef.nativeElement;
      el.classList.add('gb');
      
      item.setStyles({
        '--glow-color': this.glowColor(),
        '--border-glow-color': this.borderGlowColor(),
        '--border-color': this.borderColor(),
      });
      
      el.style.setProperty('--border-width', this.borderWidth());
      el.style.setProperty('--bg-color', this.backgroundColor());
      el.style.setProperty('--glow-size', this.glowSize());
      el.style.setProperty('--border-glow-size', this.borderGlowSize());
    });
  }
  
  private setupListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;

  // runs listeners outside angular zone to avoid change detection on every mouse move
    this.zone.runOutsideAngular(() => {
      const host = this.el.nativeElement;
      
      const onMouseMove = (event: MouseEvent) => {
  // only updates the target coordinates
        this.items.forEach(item => {
          const rect = item.elementRef.nativeElement.getBoundingClientRect();
          item.targetX = event.clientX - rect.left;
          item.targetY = event.clientY - rect.top;
        });
      };
      
      const onMouseEnter = () => {
  // starts the animation loop when the mouse enters the area
        this.startAnimationLoop();
      };
      
      const onMouseLeave = () => {
  // stops the animation loop when the mouse leaves
        this.stopAnimationLoop();
      };

      host.addEventListener('mousemove', onMouseMove);
      host.addEventListener('mouseenter', onMouseEnter);
      host.addEventListener('mouseleave', onMouseLeave);

  // stores the functions to be able to remove them later
      this.listeners.push(
        () => host.removeEventListener('mousemove', onMouseMove),
        () => host.removeEventListener('mouseenter', onMouseEnter),
        () => host.removeEventListener('mouseleave', onMouseLeave)
      );
    });
  }

  private startAnimationLoop(): void {
  if (this.animationFrameId) return; // já está rodando
    
    const animate = () => {
  // calculates the smoothing factor. the value 0.1 is a good starting point.
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