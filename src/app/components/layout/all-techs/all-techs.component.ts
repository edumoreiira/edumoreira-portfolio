import { ChangeDetectionStrategy, Component, HostBinding, inject, signal } from '@angular/core';
import { TechComponent } from '../../shared/tech/tech.component';
import { NgClass } from '@angular/common';
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';
import { GlowingBorderDirective, GlowingBorderItemDirective } from '../../../directives/glowing-border.directive';
import { IntersectionObserverDirective } from '../../../directives/intersection-observer.directive';

export interface Tech {
  class: string;
  iconUrl: string;
  title: string;
  hoveredColor: string;
}
@Component({
  selector: 'app-all-techs',
  imports: [TechComponent, NgClass, GlowingBorderItemDirective, GlowingBorderDirective, IntersectionObserverDirective],
  templateUrl: './all-techs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTechsComponent {
  lg = inject(LANGUAGE_APPLICATION);
  // 
  opened = signal(false);

  technologiesArr: Tech[] = [
    {
      class: 'col-span-2 row-span-2 delay-1',
      iconUrl: './icons/techs/angular.webp',
      title: 'Angular',
      hoveredColor: 'var(--color-pink-500)'
    },
    {
      class: 'col-span-2 delay-1',
      iconUrl: './icons/techs/html.webp',
      title: 'HTML',
      hoveredColor: 'var(--color-amber-700)'
    },
    {
      class: 'delay-2',
      iconUrl: './icons/techs/pinescript.webp',
      title: 'Pine Script',
      hoveredColor: 'var(--color-emerald-700)'
    },
    {
      class: 'row-span-2 sm:col-span-1 col-span-2 delay-2',
      iconUrl: './icons/techs/css-3.webp',
      title: 'CSS',
      hoveredColor: 'var(--color-blue-700)'
    },
    {
      class: 'col-span-2 delay-2',
      iconUrl: './icons/techs/javascript.webp',
      title: 'JavaScript',
      hoveredColor: 'var(--color-yellow-400)'
    },
    {
      class: 'delay-3',
      iconUrl: './icons/techs/ethersjs.webp',
      title: 'Ethers.js',
      hoveredColor: 'var(--color-blue-800)'
    },
    {
      class: 'row-span-2 delay-3',
      iconUrl: './icons/techs/photoshop.webp',
      title: 'Photoshop',
      hoveredColor: 'var(--color-blue-950)'
    },
    {
      class: 'col-span-2 delay-3',
      iconUrl: './icons/techs/tailwind.webp',
      title: 'Tailwind CSS',
      hoveredColor: 'var(--color-sky-500)'
    },
    {
      class: 'delay-4',
      iconUrl: './icons/techs/sass.webp',
      title: 'Sass',
      hoveredColor: 'var(--color-rose-400)'
    },
    {
      class: 'col-span-2 delay-4',
      iconUrl: './icons/techs/spring-boot.webp',
      title: 'Spring Boot',
      hoveredColor: 'var(--color-lime-600)'
    },
    {
      class: 'delay-4',
      iconUrl: './icons/techs/postgresql.webp',
      title: 'PostgreSQL',
      hoveredColor: 'var(--color-sky-950)'
    },
    {
      class: 'col-span-2 delay-5',
      iconUrl: './icons/techs/typescript.webp',
      title: 'TypeScript',
      hoveredColor: 'var(--color-blue-500)'
    },
    {
      class: 'delay-5',
      iconUrl: './icons/techs/docker.webp',
      title: 'Docker',
      hoveredColor: 'var(--color-sky-600)'
    },
    {
      class: 'delay-5',
      iconUrl: './icons/techs/illustrator.webp',
      title: 'Illustrator',
      hoveredColor: 'var(--color-amber-900)'
    },
    {
      class: 'col-span-2 delay-6',
      iconUrl: './icons/techs/git.webp',
      title: 'Git',
      hoveredColor: 'var(--color-orange-600)'
    }
  ];

  toggle() {
    this.opened.set(!this.opened());
  }
}
