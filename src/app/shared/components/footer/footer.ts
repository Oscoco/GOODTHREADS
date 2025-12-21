import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  email = '';

  subscribe(): void {
    if (this.email) {
      console.log('Suscribiendo:', this.email);
    }
  }
}
