import { Component, ViewEncapsulation } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swiper, { SwiperOptions } from 'swiper';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';
import { IonicSlides } from '@ionic/angular';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Tab1Page {
  results: Observable<any>;

  config: SwiperOptions = {
    slidesPerView: 1.5,
    spaceBetween: 10,
    loop: true,
    loopedSlides: 2,
    centeredSlides: true,
  };

  constructor(private movieService: MovieService) {
    this.getMovies();
  }

  getMovies() {
    const refresh = event ? true : false;
    this.results = this.movieService.getUsers(refresh);
    /*
    this.movieService.getUsers(refresh).subscribe((res) => {
      console.log(res);
      this.results = res;
    });
    */
  }
}
