import { Component, input } from '@angular/core';
import { Project } from '../../../models/project.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-project-overlay',
  imports: [NgClass],
  templateUrl: './project-overlay.component.html',
  styleUrl: './project-overlay.component.scss'
})
export class ProjectOverlayComponent {
  project = input.required<Project>();

}
