import { Component } from '@angular/core';
import { ButtonComponent } from '../../base/button.component';

@Component({
  selector: 'article[app-project-card]',
  host: { 
    class: 'flex flex-col gap-3 p-5 rounded-xl'
  },
  imports: [ButtonComponent],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {


}
