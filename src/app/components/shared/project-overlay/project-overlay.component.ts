import { Component, computed, effect, inject, input, model, output, signal } from '@angular/core';
import { Project } from '../../../models/project.model';
import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { EmButtonToggleGroupComponent } from '../button-toggle/em-button-toggle-group.component';
import { EmButtonToggleAnimationDirective } from '../button-toggle/em-button-toggle-animation.directive';
import { FormsModule } from '@angular/forms';
import { EmButtonToggleDirective } from '../button-toggle/em-button-toggle.directive';
import { IframeLoaderComponent } from '../../utils/iframe-loader/iframe-loader.component';
import { ProjectOverlayService } from '../../../services/project-overlay.service';
import { createAnimation } from '../../../animations/default-transitions.animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';

interface MarkdownSection {
  title: string;
  icon: string;
  content: string | undefined;
  key: string;
}

@Component({
  selector: 'app-project-overlay',
  host: {
    '[class]': 'class()',
    '[style]': '"view-transition-name: project-card-" + (project().id)'
  },
  imports: [NgClass, DatePipe, MarkdownComponent, EmButtonToggleGroupComponent, EmButtonToggleDirective,
    EmButtonToggleAnimationDirective, FormsModule, IframeLoaderComponent, NgTemplateOutlet, MatTooltipModule
  ],
  templateUrl: './project-overlay.component.html',
  styleUrl: './project-overlay.component.scss',
  animations: [
    createAnimation('fadeIn', { animateY: true, duration: '400ms' })
  ]
})
export class ProjectOverlayComponent {
  private readonly projectOverlayService = inject(ProjectOverlayService);
  readonly lg = inject(LANGUAGE_APPLICATION);
  project = input.required<Project>();
  selectedView = model<'details' | 'preview'>('details');
  closeButton = output<void>();
  readonly highlightBorder = 'border-[hsl(48_30%_15%)]'
  readonly sections = computed<MarkdownSection[]>(() => {
    return [
      { key: 'description', title: this.lg().projects.card.titles[0], icon: 'fi fi-sr-info', content: this.project().description },
      { key: 'functionalities', title: this.lg().projects.card.titles[1], icon: 'fi fi-sr-settings', content: this.project().functionalities },
      { key: 'best-practices', title: this.lg().projects.card.titles[2], icon: 'fi fi-sr-rocket-lunch', content: this.project().good_practices }
    ]
  })

  constructor() {
    effect(() => {
      this.selectedView() === 'details' ?
      this.projectOverlayService.setOverlaySize('details') :
      this.projectOverlayService.setOverlaySize('preview');
    })
  }

  class = computed(() => {
    const base = 'flex w-full bg-neutral-950 border rounded-2xl overflow-hidden relative'
    const border = this.project().is_highlight ? this.highlightBorder : 'border-neutral-800';
    return `${base} ${border}`;
  })
  

}
