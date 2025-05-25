import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, ElementRef, inject, input, OnInit, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { createAnimation, fadeTrigger } from '../../../animations/default-transitions.animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SitePreviewerService } from '../../../services/site-previewer.service';
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';

export interface WebSites {
  technologies: technologies[];
  title: string;
  description: string;
  button: string;
  imgUrl: string;
  websiteUrl: string;
}

type technologies = "angular" | "html" | "css" | "js" | "tailwind" 

@Component({
  selector: 'app-site-previewer',
  imports: [NgStyle, NgClass],
  templateUrl: './site-previewer.component.html',
  styleUrl: './site-previewer.component.scss',
  animations: [
    createAnimation('slide', { animateX: true }),
    createAnimation('fade', { opacity: '0', duration: '500ms'}),
    fadeTrigger
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SitePreviewerComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef)
  private appRef = inject(ApplicationRef);
  private viewContainerRef = inject(ViewContainerRef);
  private sanitizer = inject(DomSanitizer);
  private sitePreviewerService = inject(SitePreviewerService);
  protected lg = inject(LANGUAGE_APPLICATION);
  //
  borderless = input<boolean>(false);
  isOverlayOpen = computed(() => this.sitePreviewerService.isOverlayOpen$());
  websites = input.required<WebSites[]>();
  sanitizedUrl = signal<SafeResourceUrl>('');
  protected currentIndex = computed(() => this.sitePreviewerService.currentIndex$());
  iframe = signal({
    startLoading: false,
    loaded: false
  });
  @ViewChild('overlayTemplate') overlayTemplate!: TemplateRef<any>;
  @ViewChild('iframeRef') iframeRef: ElementRef<HTMLIFrameElement> | undefined;
  
  ngOnInit() {
    this.sanitizeCurrentUrl();
  }

  constructor() {
    effect(() => {
      this.currentIndex();
      this.sanitizeCurrentUrl(); // Update the sanitized URL whenever the current index changes
    })
  }
  
  private openOverlay() {
    const overlayRef = this.sitePreviewerService.openOverlay(this.overlayTemplate, this.viewContainerRef)
    if (overlayRef) {
      overlayRef.backdropClick().subscribe(() => {
        this.close();
      })
    }
  }

  private closeOverlay() {
    this.sitePreviewerService.closeOverlay();
  }

  open() {
    if (document.startViewTransition) {
      const transition = document.startViewTransition(async () => {
        this.openOverlay();
        await new Promise(resolve => setTimeout(resolve, 50));
        this.appRef.tick();
      });
      transition.finished.then(() => { // Wait for the transition to finish then start loading the iframe
        this.startIframeLoading();
      })
    } else {
      this.openOverlay();
      this.startIframeLoading();
    }
  }

  close() {
    if (document.startViewTransition) {
      const transition = document.startViewTransition(async () => {
        this.closeOverlay();
        this.appRef.tick();
      });
      transition.finished.then(() => { // Wait for the transition to finish then reset the iframe status
        this.resetIframe();
      });
    } else {
      this.closeOverlay();
      this.resetIframe();
    }
  }
  
  setCurrentIndex(index: number) {
    if(index < 0) {
      this.sitePreviewerService.setCurrentIndex(this.websites().length - 1);
    } else if (index >= this.websites().length) {
      this.sitePreviewerService.setCurrentIndex(0);
    } else {
      this.sitePreviewerService.setCurrentIndex(index);
    }
  }

  next() {
    this.setCurrentIndex(this.currentIndex() + 1);
  }

  previous() {
    this.setCurrentIndex(this.currentIndex() - 1);
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
  
  private sanitizeCurrentUrl() {
    this.sanitizedUrl.set(
      this.sanitizer.bypassSecurityTrustResourceUrl(this.websites()[this.currentIndex()].websiteUrl)
    )
  }

  onImageKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.open();
      event.preventDefault(); // Prevent default action for space key
    }
  }
}
