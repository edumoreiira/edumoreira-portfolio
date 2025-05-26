import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-social-icon',
  imports: [],
  template: `
  <a [attr.href]='url()' target="_blank" rel="noopener noreferrer" class="flex items-center justify-center rounded-full border border-neutral-700 text-neutral-700
   xs:h-[40px] xs:w-[40px] xs:text-base h-[37px] w-[37px] text-base
   hover:bg-neutral-200 hover:border-neutral-200 hover:text-neutral-950 transition-colors duration-200"
   [attr.aria-label]='description()'>
    <i class="{{ icon() }}"></i>
  </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialIconComponent {
  icon = input.required<string>();
  url = input('#');
  description = input('Icon'); // Optional description for the icon
}
