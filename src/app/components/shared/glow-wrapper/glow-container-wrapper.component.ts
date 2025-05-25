import { NgClass } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
    selector: 'app-glow',
    host: {
    class: 'gb',
    '[attr.data-gc]': 'group()',
    },
    template: `
        <div class="gb__bg">
        </div>
        <div class="gb__content" [ngClass]="contentClass()">
            <ng-content></ng-content>
        </div>
    `,
    standalone: true,
    imports: [NgClass]
})
export class GlowWrapperComponent {
    group = input.required<string>();
    contentClass = input<string>('');
}