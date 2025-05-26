import { NgStyle } from "@angular/common";
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, input, signal } from "@angular/core";

@Component({
    selector: 'app-tech',
    host: {
        class: 'flex items-center justify-center p-2 rounded-2xl transition-all group relative overflow-hidden',
        tabindex: '0'
    },
    template: `
    <span class="h-[28px] xs:h-[35px] sm:h-[45px] aspect-square transition-colors"
    style="mask: url('{{ iconUrl() }}') no-repeat center; mask-size: contain;"
    [ngStyle]="{ 'background-color': hovered() || focused() ?  hoveredColor() : 'hsla(0, 0%, 100%, 0.5)'  }"></span>
    <div class="absolute inset-[6px] backdrop-blur-xs opacity-0 rounded-2xl
    group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-all duration-300 ease-out flex justify-center items-center">
        <span class="scale-50 group-hover:scale-100 group-focus:scale-100 group-active:scale-100 transition-transform 
        cursor-default xs:text-base text-sm">{{ title() }}</span>
    </div>
    `,
    imports: [NgStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechComponent {
    borderless = input(false);
    iconUrl = input('');
    title = input('');
    hoveredColor = input('hsla(0, 0%, 100%, 0.5)');
    // 
    hovered = signal(false);
    focused = signal(false);

    @HostBinding('class')
    get class() {
        return this.borderless() ? '' : 'border border-neutral-800';
    }
    @HostListener('mouseenter')
    onMouseEnter() {
        this.hovered.set(true);
    }
    @HostListener('mouseleave')
    onMouseLeave() {
        this.hovered.set(false);
    }
    @HostListener('focus')
    onFocus() {
        this.hovered.set(true);
        this.focused.set(true);
    }
    @HostListener('blur')
    onBlur() {
        this.hovered.set(false);
        this.focused.set(false);
    }

}