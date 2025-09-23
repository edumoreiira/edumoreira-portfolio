import { AfterContentInit, Component, inject, NgZone, signal } from '@angular/core';
import { TimelineComponent } from '../../shared/timeline/timeline.component';
import { ButtonComponent } from '../../base/button.component';
import { RouterLink } from '@angular/router';
import { SocialIconComponent } from '../../shared/social-icon/social-icon.component';
import { BlockIntersectionDirective } from './block-intersection.directive';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-about-me',
  host: {
    class: 'grid sm:grid-cols-[6rem_1fr] sm:gap-x-0 gap-x-4 grid-cols-[2.5rem_1fr]'
  },
  imports: [TimelineComponent, ButtonComponent, RouterLink, SocialIconComponent, BlockIntersectionDirective],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  private readonly zone = inject(NgZone);
  // 
  block1Visible = signal(false);
  block2Visible = signal(false);
  block3Visible = signal(false);
  block4Visible = signal(false);
  block5Visible = signal(false);
  block6Visible = signal(false);
  block7Visible = signal(false);
  block8Visible = signal(false);
  block9Visible = signal(false);
  block10Visible = signal(false);

  constructor() {
    this.zone.runOutsideAngular(() => this.animateFirstBlock());
  }

  private animateFirstBlock() {
    timer(100).pipe(
      takeUntilDestroyed()
    )
    .subscribe(() => {
      this.block1Visible.set(true);
    });
  }
}
