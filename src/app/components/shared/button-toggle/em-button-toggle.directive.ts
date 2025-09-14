import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, computed, Directive, ElementRef, inject, input, model, output, signal } from "@angular/core";
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
  public readonly el = inject(ElementRef);
  private readonly group = inject(EmButtonToggleGroupComponent, { optional: true, host: true });

  readonly name = signal<string | null>(null);
  readonly value = input.required<any>();
  readonly selectionChange = output<EmButtonToggleChange>();
  readonly individualDisabled = input(false, { alias: 'disabled' });
  readonly checked = computed(() => {
    return this.getCheckedState();
  })

  readonly finalDisabled = computed(() => {
    return this.group?.disabled() || this.individualDisabled();
  });

  protected handleClick() {
    if (this.finalDisabled()) {
      return;
    }
    this.selectionChange.emit({ source: this, value: this.value() });
  }
  
  private getCheckedState() {
    // If there is no group, this button is not checked
    if (!this.group) {
      return false;
    }
    const groupValue = this.group.$value();
    const buttonValue = this.value();
    // If group allows multiple selection, check if buttonValue is in groupValue array
    if (this.group.multiple()) {
      // Ensure groupValue is an array and includes buttonValue
      return Array.isArray(groupValue) && groupValue.includes(buttonValue);
    } else {
      // Single selection: check if groupValue equals buttonValue
      return groupValue === buttonValue;
    }
  }

  readonly  class = computed(() => {
    const base = 'px-4 py-2 rounded-lg transition-all';
    const checked = this.checked() ? 'text-white' : 'text-neutral-300';
    const disabled = this.finalDisabled() ? 'opacity-30 cursor-not-allowed' : '';
    return `${base} ${checked} ${disabled}`;
  });
}