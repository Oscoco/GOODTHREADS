import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ASSETS_PATHS } from '../../../core/constants/assets.constants';

@Component({
  selector: 'app-footer',
  imports: [FormsModule, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  email = '';
  ASSETS_PATHS = ASSETS_PATHS;

  subscribe(): void {
    if (this.email) {
      console.log('Suscribiendo:', this.email);
    }
  }
}
