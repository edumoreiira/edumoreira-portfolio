import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type LineGradient =
  | { type: 'linear'; from: string; to: string }
  | { type: 'custom-middle'; middleColors: [string, string, string] };

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  host: {
    'class': 'flex flex-col items-center',
    '[class.is-visible]': 'isVisible()',
  },
  template: `
    <div class="glow-fx" [style]="glowStyles()">
      <img
        [src]="iconUrl()"
        alt=""
        [style.width]="size()"
        class="brightness-0 invert"
        [class]="iconClass()">
    </div>

    <div
    class="timeline-line w-[3px] my-2 rounded-full flex-1"
    [style]="lineStyles()">
  </div>
  `,
  styleUrl: './timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent {
  // general inputs
  readonly iconUrl = input<string>('/icons/techs/angular.webp');
  readonly size = input('2.5rem');
  readonly margin = input('0');
  readonly iconClass = input<string>('');

  // glow effect inputs
  readonly glowColor = input<string>('#7c72ff');
  readonly glowSize = input<string>('35px');
  readonly glowBlur = input<string>('18px');

  // line gradient input
  readonly lineGradient = input<LineGradient>({ type: 'linear', from: 'rgb(55 65 81)', to: 'rgb(55 65 81)' });

  // internal signal to control visibility class
  readonly isVisible = input(true);

  // computed signal to generate the glow styles as css custom properties
  readonly glowStyles = computed(() => ({
    '--glow-color': this.glowColor(),
    '--glow-size': this.glowSize(),
    '--glow-blur': this.glowBlur(),
    'margin': this.margin()
  }));

  // computed signal to generate the line gradient style
  readonly lineStyles = computed(() => {
    const gradient = this.lineGradient();
    let backgroundImage = '';

    if (gradient.type === 'linear') {
      backgroundImage = `linear-gradient(to bottom, ${gradient.from} 35%, ${gradient.to})`;
    } else {
      const [color1, color2, color3] = gradient.middleColors;
      backgroundImage = `linear-gradient(to bottom, ${color1}, ${color2}, ${color3})`;
    }

    return { 'background-image': backgroundImage };
  });
}