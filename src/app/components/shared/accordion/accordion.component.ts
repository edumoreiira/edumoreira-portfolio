import { ChangeDetectionStrategy, Component, HostListener, input, output, signal } from "@angular/core";
import { createAnimation } from "../../../animations/default-transitions.animations";
import { NgClass } from "@angular/common";

@Component({
    selector: 'accordion',
    host: {
        tabIndex: '0',
    },
    template: `
    <div
      class="rounded-xl transition-colors"
      [ngClass]="{
        'border border-neutral-700 bg-neutral-600/5 hover:border-neutral-600': isOpen() && !borderless(),
        'border border-neutral-800 hover:border-neutral-600': !isOpen() && !borderless(),
        'bg-neutral-600/5': borderless() && isOpen(),
      }"

    >
        <div class="flex items-center justify-between px-6 py-4 cursor-pointer"
        (click)="clicked.emit()">
            <h2 class="text-lg font-semibold">{{ title() }}</h2>
            <i class="fi fi-rr-angle-small-down flex transition-all" 
            [ngClass]="{ 'rotate-180': isOpen() }"
            ></i>
        </div>
        @if (isOpen()) {
          <div class="px-6 pb-4 overflow-hidden" @slideAccordion>
            <ng-content></ng-content>
          </div>
        }
    </div>
    `,
    imports: [NgClass],
    animations: [createAnimation("slideAccordion", { animateY: true })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
    borderless = input<boolean>(false);
    title = input.required<string>();
    isOpen = input(false);
    clicked = output();

    @HostListener('keydown', ['$event'])
    onHostKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            this.clicked.emit();
            event.preventDefault(); // Prevent default action for space key
        }
    }
}
