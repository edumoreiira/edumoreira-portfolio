import { Component } from '@angular/core';
import { TimelineComponent } from '../../shared/timeline/timeline.component';
import { ButtonComponent } from '../../base/button.component';
import { RouterLink } from '@angular/router';
import { SocialIconComponent } from '../../shared/social-icon/social-icon.component';

@Component({
  selector: 'app-about-me',
  host: {
    class: 'grid sm:grid-cols-[6rem_1fr] sm:gap-x-0 gap-x-4 grid-cols-[2.5rem_1fr]'
  },
  imports: [TimelineComponent, ButtonComponent, RouterLink, SocialIconComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

}
