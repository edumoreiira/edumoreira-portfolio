import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { LANGUAGE_APPLICATION } from '../../tokens/language.tokens';
import { ButtonComponent } from '../../components/base/button.component';
import { SitePreviewerComponent, WebSites } from "../../components/shared/site-previewer/site-previewer.component";
import { AccordionComponent } from "../../components/shared/accordion/accordion.component";
import { SitePreviewerService } from '../../services/site-previewer.service';
import { TagComponent } from "../../components/shared/tag/tag.component";
import { AllTechsComponent } from "../../components/layout/all-techs/all-techs.component";
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { ChatMailComponent } from "../../components/layout/chat-mail/chat-mail.component";
import { createAnimation } from '../../animations/default-transitions.animations';
import { IntersectionObserverDirective } from '../../directives/intersection-observer.directive';
import { GlowingBorderDirective, GlowingBorderItemDirective } from '../../directives/glowing-border.directive';
import { DocumentListenerService } from '../../services/document-listener.service';
import { LanguageService } from '../../services/language.service';
import { language_pt_br } from '../../models/language.model';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, SitePreviewerComponent, AccordionComponent,
    TagComponent, AllTechsComponent, FooterComponent, ChatMailComponent, IntersectionObserverDirective,
    GlowingBorderDirective, GlowingBorderItemDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    createAnimation('fadeInUp', { transform: 'translateY(3rem)', duration: '700ms' })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
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
      websiteUrl: "https://edumoreiira.github.io/aju-films/"
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
