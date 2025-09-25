import { AfterContentInit, Component, computed, contentChildren, ElementRef, inject, input, OnInit, Renderer2, viewChild } from '@angular/core';

@Component({
  selector: 'app-infinite-scrolling',
  host: {
    class: 'slider',
    '[class.fade-corner]': 'fadeCorner()',
    '[class.pause-on-hover]': 'pauseOnHover()',
    '[class.vertical]': 'direction() === "vertical"',
    '[class.horizontal]': 'direction() === "horizontal"',
    '[style]': 'sliderStyles()',
  },
  imports: [],
  template: `
    <div class="list">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './infinite-scrolling.component.scss'
})
export class InfiniteScrollingComponent implements AfterContentInit{
  private readonly renderer = inject(Renderer2);
  private readonly slider = inject(ElementRef);
  // 
  readonly speed = input<number>(20);
  readonly gap = input<number>(0);
  readonly fadeCorner = input<boolean>(true);
  readonly reverse = input<boolean>(false);
  readonly pauseOnHover = input<boolean>(true);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  // 
  sliderStyles = computed(() => {
    return this.getSliderParams();
  }) 
  private readonly items = contentChildren('item', { read: ElementRef });


  ngAfterContentInit(): void {
    setTimeout(() => { // await a tick to ensure items are rendered
      this.updateSliderParams();
      this.setItemPosition();
    });
  }

  private getItemParams(): [width: number, height: number, quantity: number] {
    const item = this.items().length > 0 ? this.items()[0].nativeElement : null;
    return [
      item ? item.offsetWidth : 0,
      item ? item.offsetHeight : 0,
      this.items().length
    ];
  }

  private getSliderParams() {
    const [width, height, quantity] = this.getItemParams();
    return `
    --item-width: ${width}px;
    --item-height: ${height}px;
    --quantity: ${quantity};
    --gap: ${this.gap()}px;
    --animation-duration: ${this.speed()}s;
    --animation-direction: ${this.reverse() ? 'reverse' : 'normal'};
    width: ${this.direction() === 'horizontal' ? '100%' : `${width}px`};
    height: ${this.direction() === 'vertical' ? '100%' : `${height}px`};
    `
  }

  private updateSliderParams() {
    const sliderEl = this.slider.nativeElement;
    const styles = this.getSliderParams();
    this.renderer.setAttribute(sliderEl, 'style', styles);
  }

  private setItemPosition() {
    this.items().forEach((item, index) => {
      const itemEl = item.nativeElement as HTMLElement;
      itemEl.style.setProperty('--position', (index + 1).toString());
    });
  }
  
}
