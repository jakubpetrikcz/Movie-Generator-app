import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor() {}

  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    //autoplay: true,
  };
}
