import { AfterContentInit, Component, computed, contentChildren, ElementRef, inject, input, OnInit, Renderer2, viewChild } from '@angular/core';

@Component({
  selector: 'app-infinite-scrolling',
  host: {

  },
  imports: [],
  template: `
    <div #slider class="slider">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './infinite-scrolling.component.scss'
})
export class InfiniteScrollingComponent implements AfterContentInit{
  renderer = inject(Renderer2);
  // 
  speed = input<number>(3);
  items = contentChildren('item', { read: ElementRef });
  slider = viewChild.required('slider', { read: ElementRef });

  sliderStyles = computed(() => {
    return this.getSliderParams();
  }) 


  ngAfterContentInit(): void {
    this.updateSliderParams();
    this.setItemPosition();
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
    --animation-duration: ${10}s;
    `
  }

  private updateSliderParams() {
    const sliderEl = this.slider().nativeElement;
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
