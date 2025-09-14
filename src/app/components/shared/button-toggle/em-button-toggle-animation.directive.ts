import { AfterContentInit, AfterViewInit, computed, Directive, effect, ElementRef, inject, PLATFORM_ID } from "@angular/core";
import { EmButtonToggleGroupComponent } from "./em-button-toggle-group.component";
import { isPlatformBrowser } from "@angular/common";

interface ButtonState {
  index: number;
  height: number;
  width: number;
  offsetX: number;
  offsetY: number;
}

@Directive({
  selector: 'em-button-toggle-group[em-button-toggle-animation]',
  host: {
    class: 'em-button-toggle-group-animation',
    '(window:resize)': 'updateButtonBackgroundPosition()'
  }
})
export class EmButtonToggleAnimationDirective {
  private readonly group = inject(EmButtonToggleGroupComponent);
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  activeButtonIndex = computed(() => {
    console.log(this.group.buttons());
    return this.group.buttons().findIndex(b => b.checked());
  })

  state: ButtonState[] = [];

  constructor() {
    effect(() => {
      const activeIndex = this.activeButtonIndex();
      // if there is no active button, or we are not in the browser (ssr), do nothing
      if (activeIndex === -1 || !isPlatformBrowser(this.platformId)) {
        return;
      }
      this.updateButtonBackgroundPosition();
    });
  }


  private updateState() {
    this.state = this.group.buttons().map((button, index) => {
      const rect = button.el.nativeElement.getBoundingClientRect();
      const parentRect = this.el.nativeElement.getBoundingClientRect();
      return {
        index,
        height: rect.height,
        width: rect.width,
        offsetX: rect.left - parentRect.left,
        offsetY: rect.top - parentRect.top
      };
    });
  }

  private setClassVariables() {
    const activeState = this.state[this.activeButtonIndex()];
    this.el.nativeElement.style.setProperty('--left', `${activeState.offsetX}px`);
    this.el.nativeElement.style.setProperty('--top', `${activeState.offsetY}px`);
    this.el.nativeElement.style.setProperty('--width', `${activeState.width}px`);
    this.el.nativeElement.style.setProperty('--height', `${activeState.height}px`);
  }

  private updateButtonBackgroundPosition() {
    this.updateState();
    this.setClassVariables();
  }
}