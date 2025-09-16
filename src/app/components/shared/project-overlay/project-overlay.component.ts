import { Component, input, model, signal } from '@angular/core';
import { Project } from '../../../models/project.model';
import { DatePipe, NgClass } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { EmButtonToggleGroupComponent } from '../button-toggle/em-button-toggle-group.component';
import { EmButtonToggleAnimationDirective } from '../button-toggle/em-button-toggle-animation.directive';
import { FormsModule } from '@angular/forms';
import { EmButtonToggleDirective } from '../button-toggle/em-button-toggle.directive';

@Component({
  selector: 'app-project-overlay',
  host: {
    class:'block w-full bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden relative'
  },
  imports: [NgClass, DatePipe, MarkdownComponent, EmButtonToggleGroupComponent, EmButtonToggleDirective,
    EmButtonToggleAnimationDirective, FormsModule
  ],
  templateUrl: './project-overlay.component.html',
  styleUrl: './project-overlay.component.scss'
})
export class ProjectOverlayComponent {
  project = input.required<Project>();
  selectedView = model<'details' | 'preview'>('details');

}
