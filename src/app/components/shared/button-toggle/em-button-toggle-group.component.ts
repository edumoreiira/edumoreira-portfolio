import { AfterContentInit, Component, input, viewChildren } from '@angular/core';
import { EmButtonToggleDirective } from './em-button-toggle.directive';

@Component({
  selector: 'em-button-toggle-group',
  host: {
    class: 'p-1 border border-neutral-800 rounded-xl',
    role: 'radiogroup',
    '[attr.name]': 'name()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-multiselectable]': 'multiple() ? "true" : null',
  },
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
})
export class EmButtonToggleGroupComponent implements AfterContentInit {
  disabled = input<boolean>(false);
  multiple = input<boolean>(false);
  name = input.required<string>();
  
  buttons = viewChildren(EmButtonToggleDirective, { read: EmButtonToggleDirective });

  ngAfterContentInit() {
    // 
  }

}
