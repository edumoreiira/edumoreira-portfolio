import { Component, computed, inject, input, output, viewChild } from '@angular/core';
import { WebSites } from '../site-previewer.component';
import { IframeLoaderComponent } from '../../../utils/iframe-loader/iframe-loader.component';
import { LANGUAGE_APPLICATION } from '../../../../tokens/language.tokens';

@Component({
  selector: 'app-overlay-content',
  host: {
    class: 'block border border-neutral-800 rounded-t-xl overflow-hidden bg-neutral-950 flex flex-col h-full w-full',
    style: 'view-transition-name: site-preview'
  },
  imports: [IframeLoaderComponent],
  templateUrl: './overlay-content.component.html',
})
export class OverlayContentComponent {
  lg = inject(LANGUAGE_APPLICATION);
  website = input.required<WebSites>();
  closeOverlay = output<void>();
  iframeLoader = viewChild.required(IframeLoaderComponent);

  onClose() {
    this.closeOverlay.emit();
  }

  startIframeLoading() {
    this.iframeLoader().startIframeLoading();
  }

}