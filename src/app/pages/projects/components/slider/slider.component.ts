import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() sliderInputValue: any;
  @Output() sliderEventTrigger: EventEmitter<any> = new EventEmitter();

  isSmallSizeScreen: boolean;
  slideOpts = {};

  constructor(public platform: Platform) {}

  ngOnInit() {
    this.plateFormCheck();
    this.platform.resize.subscribe(async () => {
      this.plateFormCheck();
    });
  }

  plateFormCheck() {
    if (this.platform.width() < 427) {
      this.slideOpts = {
        spaceBetween: 10,
        slidesPerView: 1.5,
        centeredSlides: true,
        loop: true,
      };
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 640 && this.platform.width() > 427) {
      this.slideOpts = {
        spaceBetween: 10,
        slidesPerView: 1.4,
        centeredSlides: true,
        loop: true,
      };
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 854 && this.platform.width() > 640) {
      this.slideOpts = {
        spaceBetween: 10,
        slidesPerView: 2,
        centeredSlides: true,
        loop: true,
      };
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 1300 && this.platform.width() > 1200) {
      this.slideOpts = {
        spaceBetween: 10,
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
      };
      this.isSmallSizeScreen = false;
    } else if (this.platform.width() < 1200) {
      this.slideOpts = {
        spaceBetween: 10,
        slidesPerView: 3.2,
        centeredSlides: true,
        loop: true,
      };
      this.isSmallSizeScreen = true;
    } else {
      this.isSmallSizeScreen = false;
      this.slideOpts = {
        spaceBetween: 10,
        slidesPerView: 1.5,
        freeMode: true,
        centeredSlides: true,
        loop: true,
      };
    }
  }

  /*
  sliderClickEventTrigger(modelValue) {
    this.sliderEventTrigger.emit(modelValue);
  }
  */
}
