import { Component } from '@angular/core';
import { AboutMeComponent } from '../about-me/about-me.component';
import { AllTechsComponent } from '../all-techs/all-techs.component';
import { InfiniteScrollingComponent } from '../../utils/infinite-scrolling/infinite-scrolling.component';

@Component({
  selector: 'app-developer-home',
  imports: [AboutMeComponent, AllTechsComponent, InfiniteScrollingComponent],
  templateUrl: './developer-home.component.html',
  styleUrl: './developer-home.component.scss'
})
export class DeveloperHomeComponent {

}
