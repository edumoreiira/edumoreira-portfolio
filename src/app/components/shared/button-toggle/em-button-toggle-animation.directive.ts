import { AfterContentInit, computed, Directive, ElementRef, inject, PLATFORM_ID } from "@angular/core";
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
  }
})
export class EmButtonToggleAnimationDirective implements AfterContentInit {
  private readonly group = inject(EmButtonToggleGroupComponent);
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  activeButtonIndex = computed(() => {
    return this.group.buttons().findIndex(b => b.checked());
  })

  state: ButtonState[] = [];


  ngAfterContentInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateState();
      this.group.change.subscribe(() => {
        setTimeout(() => { // prevent layout shift issues
          this.updateState();
          this.setClassVariables();
        });
      });
    }
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
}