import { ChangeDetectionStrategy, Component, HostBinding, HostListener, input, signal } from '@angular/core';
import { createAnimation } from '../../../animations/default-transitions.animations';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tag',
  imports: [NgClass],
  host: {
    tabIndex: '0',
    class: 'md:max-w-[min(25rem,100%)] lg:max-w-[min(27rem,100%)] md:w-auto w-full flex flex-col py-4 px-6 rounded-2xl text-neutral-200 cursor-pointer transition-all duration-200 overflow-hidden'
  },
  template: `
    <div class="flex items-center justify-between gap-2 xs:gap-18 lg:gap-22">
      <h2 class="leading-none font-semibold text-lg whitespace-nowrap">{{ title() }}</h2>
      <div class="flex items-center gap-1">
          <i class="fi {{ icon() }} flex text-lg"></i>
          <i class="fi fi-rr-caret-down flex text-sm transition-transform duration-200"
          [ngClass]="{ 'rotate-180': opened() }"></i>
      </div>
    </div>
    @if (opened()) {
      <hr class="border-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent my-4" @slide>
      <p class="text-neutral-400 text-sm" @slide>{{ description() }}</p>
    }
  `,
  animations: [
    createAnimation('slide', { animateX: true, animateY: true, duration: '350ms',opacity: '0' }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  title = input.required();
  description = input.required();
  borderless = input(false);
  icon = input('fi-rr-time-fast');
  // 
  opened = signal(false);
  

  toggle() {
    this.opened.update((state) => !state);
  }

  @HostListener('click')
  onHostClick() {
    this.toggle()
  }

  @HostListener('keydown', ['$event'])
  onHostKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggle();
      event.preventDefault(); // Prevent default action for space key
    }
  }

  @HostBinding('class')
  get hostClasses() {
    if (this.borderless()) {
      return this.opened() ? 'bg-neutral-600/5' : 'bg-transparent';
    }
    // If borderless is false, apply the border styles
    const borderClasses = 'border hover:border-neutral-600'
    return this.opened() ? 'border-neutral-700 bg-neutral-600/5' + ' ' + borderClasses
     : 'border-neutral-800' + ' ' + borderClasses;
  }
}
