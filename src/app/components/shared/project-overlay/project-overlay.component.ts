import { Component, effect, inject, input, model, signal } from '@angular/core';
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

@Component({
  selector: 'app-project-overlay',
  host: {
    class:'flex w-full bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden relative',
    '[style]': '"view-transition-name: project-card-" + (project().id)'
  },
  imports: [NgClass, DatePipe, MarkdownComponent, EmButtonToggleGroupComponent, EmButtonToggleDirective,
    EmButtonToggleAnimationDirective, FormsModule, IframeLoaderComponent, NgTemplateOutlet
  ],
  templateUrl: './project-overlay.component.html',
  styleUrl: './project-overlay.component.scss',
  animations: [
    createAnimation('fadeIn', { animateY: true, duration: '400ms' })
  ]
})
export class ProjectOverlayComponent {
  private readonly projectOverlayService = inject(ProjectOverlayService);
  project = input.required<Project>();
  selectedView = model<'details' | 'preview'>('details');

  constructor() {
    effect(() => {
      this.selectedView() === 'details' ?
      this.projectOverlayService.setOverlaySize('details') :
      this.projectOverlayService.setOverlaySize('preview');
    })
  }


}
