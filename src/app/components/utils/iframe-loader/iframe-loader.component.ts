import { ChangeDetectorRef, Component, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { createAnimation } from '../../../animations/default-transitions.animations';
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';

@Component({
  selector: 'app-iframe-loader',
  imports: [],
  animations: [createAnimation('fade', { opacity: '0', duration: '500ms'}),],
  templateUrl: './iframe-loader.component.html',
})
export class IframeLoaderComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef)
  private sanitizer = inject(DomSanitizer);
  protected lg = inject(LANGUAGE_APPLICATION);
  // 
  iframe = signal({
    startLoading: false,
    loaded: false
  });
  url = input.required<string>();
  imageUrl = input<string>();
  sanitizedUrl = signal<SafeResourceUrl>('');

  @ViewChild('iframeRef') iframeRef: ElementRef<HTMLIFrameElement> | undefined;

  ngOnInit() {
    this.sanitizeUrl();
  }

  setIframeLoaded(loaded: boolean) {
    if(this.iframeRef) {
      this.iframe.update((state) => ({
        ...state,
        loaded: loaded
      }));
    }
  }

  startIframeLoading() {
    this.iframe.update((state) => ({
      ...state,
      startLoading: true
    }));
    setTimeout(() => {
      this.cdr.detectChanges(); // Force change detection so iframeRef is updated
    },); 
  }

  resetIframe() {
    this.iframe.set({
      startLoading: false,
      loaded: false
    });
  }

  private sanitizeUrl() {
    this.sanitizedUrl.set(
      this.sanitizer.bypassSecurityTrustResourceUrl(this.url())
    )
  }


}
