import { Component } from '@angular/core';
import { ASSETS_PATHS } from '../../core/constants/assets.constants';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly heroImage = ASSETS_PATHS.images.hero.hero1;
  readonly sudaderaImage = ASSETS_PATHS.images.sudadera.sudadera1;
  readonly heroLoop = ASSETS_PATHS.videos.heroLoop;
}
