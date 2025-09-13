import { Directive, input, output } from "@angular/core";

export interface EmButtonToggleChange {
  source: EmButtonToggleDirective,
  value: any
}

@Directive({
  selector: 'button[em-button-toggle]',
  host: {
    class: 'px-4 py-2 rounded-lg bg-neutral-800',
    role: 'radio',
    tabindex: '0',
    '[attr.aria-checked]': 'checked() ? "true" : "false"',
    '[disabled]': 'disabled() ? "true" : null',
  }
})
export class EmButtonToggleDirective {
  
  readonly value = input<any>();
  readonly disabled = input<boolean>(false);
  readonly checked = input<boolean>(false);
  clicked = output<EmButtonToggleChange>();


  protected handleClick() {
    this.clicked.emit({ source: this, value: this.value });
  }
}