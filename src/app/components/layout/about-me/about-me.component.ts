import { Component } from '@angular/core';
import { TimelineComponent } from '../../shared/timeline/timeline.component';
import { ButtonComponent } from '../../base/button.component';

@Component({
  selector: 'app-about-me',
  host: {
    class: 'grid grid-cols-[6rem_1fr]'
  },
  imports: [TimelineComponent, ButtonComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

}
