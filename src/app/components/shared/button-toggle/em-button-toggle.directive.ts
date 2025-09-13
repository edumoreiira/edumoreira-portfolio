import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, computed, Directive, inject, input, model, output, signal } from "@angular/core";
import { EmButtonToggleGroupComponent } from "./em-button-toggle-group.component";

export interface EmButtonToggleChange {
  source: EmButtonToggleDirective,
  value: any
}

@Directive({
  selector: 'button[em-button-toggle]',
  standalone: true,
  host: {
    'type': 'button',
    '[class]': 'class()',
    'role': 'radio',
    'tabindex': '0',
    '(click)': 'handleClick()',
    '[attr.name]': 'name()',
    // now we just read the model signal directly
    '[attr.aria-checked]': 'checked() ? "true" : "false"',
    '[class.selected]': 'checked()',
    '[disabled]': 'finalDisabled()',
    '[attr.aria-disabled]': 'finalDisabled()',
  }
})
export class EmButtonToggleDirective {
  group = inject(EmButtonToggleGroupComponent, { optional: true, host: true });

  readonly checked = model(false);
  readonly name = signal<string | null>(null);
  readonly value = input.required<any>();
  readonly selectionChange = output<EmButtonToggleChange>();
  readonly individualDisabled = input(false, { alias: 'disabled' });

  readonly finalDisabled = computed(() => {
    return this.group?.disabled() || this.individualDisabled();
  });

  protected handleClick() {
    if (this.finalDisabled()) {
      return;
    }
    this.selectionChange.emit({ source: this, value: this.value() });
  }

  readonly  class = computed(() => {
    const base = 'px-4 py-2 rounded-lg transition-colors';
    const checked = this.checked() ? 'bg-neutral-800 font-semibold' : '';
    const disabled = this.finalDisabled() ? 'opacity-50 cursor-not-allowed' : '';
    return `${base} ${checked} ${disabled}`;
  });
}