import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-descuentos',
  imports: [],
  templateUrl: './descuentos.html',
  styleUrl: './descuentos.scss',
})
export class Descuentos implements OnInit, OnDestroy {
  messages = [
    'Free shipping from $49! Click here!',
    'New products available! Discover the collection',
    '20% discount on your first purchase',
    'Follow us on social media and get exclusive offers'
  ];

  currentIndex = signal(0);
  isAnimating = signal(false);
  private intervalId: any;

  ngOnInit() {
    // Cambiar automáticamente cada 4 segundos
    this.intervalId = setInterval(() => {
      this.nextMessage();
    }, 4000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get currentMessage() {
    return this.messages[this.currentIndex()];
  }

  nextMessage() {
    this.isAnimating.set(true);
    setTimeout(() => {
      this.currentIndex.update(index => (index + 1) % this.messages.length);
      this.isAnimating.set(false);
    }, 300);
  }

  previousMessage() {
    this.isAnimating.set(true);
    setTimeout(() => {
      this.currentIndex.update(index => 
        index === 0 ? this.messages.length - 1 : index - 1
      );
      this.isAnimating.set(false);
    }, 300);
  }

  pauseAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resumeAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextMessage();
    }, 4000);
  }
}
