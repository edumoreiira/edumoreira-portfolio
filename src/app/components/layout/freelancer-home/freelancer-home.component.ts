import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { language_pt_br } from '../../../models/language.model';
import { DocumentListenerService } from '../../../services/document-listener.service';
import { LanguageService } from '../../../services/language.service';
import { SitePreviewerService } from '../../../services/site-previewer.service';
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';
import { SitePreviewerComponent, WebSites } from '../../shared/site-previewer/site-previewer.component';
import { GlowingBorderDirective, GlowingBorderItemDirective } from '../../../directives/glowing-border.directive';
import { AccordionComponent } from '../../shared/accordion/accordion.component';
import { ChatMailComponent } from '../chat-mail/chat-mail.component';
import { TagComponent } from '../../shared/tag/tag.component';
import { AllTechsComponent } from '../all-techs/all-techs.component';
import { IntersectionObserverDirective } from '../../../directives/intersection-observer.directive';
import { ButtonComponent } from '../../base/button.component';

@Component({
  selector: 'app-freelancer-home',
  imports: [GlowingBorderDirective, GlowingBorderItemDirective, AccordionComponent, SitePreviewerComponent,
    ChatMailComponent, TagComponent, AllTechsComponent, IntersectionObserverDirective, ButtonComponent],
  templateUrl: './freelancer-home.component.html',
  styleUrl: './freelancer-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FreelancerHomeComponent {
  protected lg = inject(LANGUAGE_APPLICATION);
  private sitePreviewerService = inject(SitePreviewerService);
  private documentListener = inject(DocumentListenerService);
  private languageService = inject(LanguageService);
  // 
  protected currentSiteIndex = computed(() => this.sitePreviewerService.currentIndex$());
  protected screensize = computed(() => this.documentListener.screenSize$());
  protected isPtBr = computed(() => this.languageService.$currentLanguage() === language_pt_br);

  websites = computed<WebSites[]>(() => [
    {
      technologies: ["angular", "tailwind", "html", "css", "js"],
      title: "Bera Pools",
      description: this.lg().works.accordions[0].description,
      button: this.lg().works.accordions[0].button,
      imgUrl: "./website-preview/bera-pools.jpeg",
      websiteUrl: "https://ysociety-eth.github.io/web3-wallet-manager/"
    },
    {
      technologies: ["html", "css", "js"],
      title: "e-art",
      description: this.lg().works.accordions[1].description,
      button: this.lg().works.accordions[1].button,
      imgUrl: "./website-preview/e-art.jpeg",
      websiteUrl: "https://edumoreiira.github.io/e-art/"
    },
    {
      technologies: ["angular", "tailwind", "html", "css", "js"],
      title: "Aju Films",
      description: this.lg().works.accordions[2].description,
      button: this.lg().works.accordions[2].button,
      imgUrl: "./website-preview/aju-films.jpeg",
      websiteUrl: "https://ajufilms.com.br/"
    },
  ]);

  setCurrentSiteIndex(index: number) {
    this.sitePreviewerService.setCurrentIndex(index);
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

}
