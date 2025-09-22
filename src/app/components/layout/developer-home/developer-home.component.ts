import { Component } from '@angular/core';
import { TimelineComponent } from "../../shared/timeline/timeline.component";
import { AboutMeComponent } from '../about-me/about-me.component';

@Component({
  selector: 'app-developer-home',
  imports: [AboutMeComponent],
  templateUrl: './developer-home.component.html',
  styleUrl: './developer-home.component.scss'
})
export class DeveloperHomeComponent {

}
