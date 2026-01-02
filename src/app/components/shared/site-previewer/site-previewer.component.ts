import { ApplicationRef, ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SitePreviewerService } from '../../../services/site-previewer.service';
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';
import { createAnimation, fadeTrigger } from '../../../animations/default-transitions.animations';
import { NgClass, NgStyle } from '@angular/common';

export interface WebSites {
    technologies: technologies[];
    title: string;
    description: string;
    button: string;
    imgUrl: string;
    websiteUrl: string;
    type: 'Website' | 'Blog';
}

type technologies = "angular" | "html" | "css" | "js" | "tailwind" | "supabase";

@Component({
    selector: 'app-site-previewer',
    imports: [NgClass, NgStyle],
    templateUrl: './site-previewer.component.html',
    styleUrl: './site-previewer.component.scss',
    animations: [
        createAnimation('slide', { animateX: true }),
        createAnimation('fade', { opacity: '0', duration: '500ms' }),
        fadeTrigger
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SitePreviewerComponent {
  private appRef = inject(ApplicationRef);
  private sitePreviewerService = inject(SitePreviewerService);
  protected lg = inject(LANGUAGE_APPLICATION);
  //
  borderless = input<boolean>(false);
  isOverlayOpen = computed(() => this.sitePreviewerService.isOverlayOpen$());
  websites = input.required<WebSites[]>();
  protected currentIndex = computed(() => this.sitePreviewerService.currentIndex$());
  
  private openOverlay() {
    const result = this.sitePreviewerService.openOverlay();
    if (result) {
      const { overlayRef, componentRef } = result;
      // set inputs on the new overlay content component
      componentRef.setInput('website', this.websites()[this.currentIndex()]);
      // listen to the close event from the overlay content
      const closeSub = componentRef.instance.closeOverlay.subscribe(() => {
        this.close();
        closeSub.unsubscribe();
      });
      overlayRef.backdropClick().subscribe(() => {
        this.close();
      });
    }
    return result;
  }

  private closeOverlay() {
    this.sitePreviewerService.closeOverlay();
  }

  open() {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        const overlayContentRef = this.openOverlay();
        this.appRef.tick();
        overlayContentRef?.componentRef.instance.startIframeLoading();
      });
    } else {
      const overlayContentRef = this.openOverlay();
      overlayContentRef?.componentRef.instance.startIframeLoading();
    }
  }

  close() {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        this.closeOverlay();
        this.appRef.tick();
      });
    } else {
      this.closeOverlay();
    }
  }

  setCurrentIndex(index: number) {
    if (index < 0) {
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

  onImageKeydown(event: KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
          this.open();
          event.preventDefault();
      }
  }
}