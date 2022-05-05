import { Component, OnInit } from '@angular/core';
import Swiper, { SwiperOptions } from 'swiper';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from 'swiper';
import { IonicSlides, ModalController, Platform } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isSmallSizeScreen: boolean;
  slideOpts: SwiperOptions = {};
  slideOptsTrailers: SwiperOptions = {};
  results: any = [];
  response: any;

  discoverResults: any = [];
  discoverResponse: any;

  topRatedResults: any = [];
  topRatedResponse: any;

  id: string;
  title: string;
  image: string;

  modelType = 'movie';
  sliderContainer: any = [];
  genreContainerList: any = [];
  page: number;
  genreSelectedValue: any;
  filteredGenreId: string;
  appCardContainer: any = [];
  loadingCurrentEventData: any;

  video: string;
  videoUrl: any = [];
  videoAfter: string;
  videoDangerousUrl: any = [];
  isVideoEnabled: boolean;

  isMobile = true;

  constructor(
    private service: MovieService,
    private sanitizer: DomSanitizer,
    private platform: Platform,
    public modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.initializeGenreContainer();
    this.initializeTrendContainer();
    this.getTopRatedMovies();
    this.getDiscoverMovie();
    this.plateFormCheck();
    this.platform.resize.subscribe(async () => {
      this.plateFormCheck();
    });
    // if (this.platform.isPortrait()) {
    //   console.log('Ahoj');
    // }
  }

  isMobileSize() {
    if (this.platform.width() <= 820) {
      return this.isMobile;
    }
  }

  getItems(data) {
    const items = [];
    if (JSON.parse(localStorage.getItem('items')) === null) {
      items.push(data);
      localStorage.setItem('items', JSON.stringify(items));
    } else {
      const localItems = JSON.parse(localStorage.getItem('items'));
      localItems.map((details) => {
        if (data.id !== details.id) {
          if (items[data.title] === undefined) {
            items[data.title] = data.title;
          }
          items.push(details);
        }
      });
      items.push(data);
      console.log(items);
      localStorage.setItem('items', JSON.stringify(items));
    }
  }

  initializeGenreContainer() {
    this.service.getGenreList(this.modelType).subscribe((genreEl) => {
      genreEl.genres.forEach((genreElement) => {
        this.genreContainerList.push(genreElement);
      });
    });
  }

  initializeTrendContainer() {
    this.page = 1;
    this.filteredGenreId = '';
    this.getTrendMovies();
  }

  plateFormCheck() {
    if (this.platform.width() < 427) {
      this.slideOpts = {
        slidesPerView: 2,
        loopedSlides: 2,
        loop: true,
      };
      this.slideOptsTrailers = {
        slidesPerView: 1.3,
        loopedSlides: 2,
        loop: true,
        preloadImages: true,
      };
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 640 && this.platform.width() > 427) {
      this.slideOpts = {
        spaceBetween: 10,
        slidesPerView: 1.7,
        loopedSlides: 2,
        loop: true,
      };
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 854 && this.platform.width() > 640) {
      this.slideOpts = {
        spaceBetween: 10,
        slidesPerView: 2,
        loopedSlides: 2,
        loop: true,
      };
      this.isSmallSizeScreen = true;
    } else if (this.platform.width() < 1300 && this.platform.width() > 1200) {
      this.slideOpts = {
        spaceBetween: 10,
        slidesPerView: 1,
        loopedSlides: 2,
        loop: true,
      };
      this.isSmallSizeScreen = false;
    } else if (this.platform.width() < 1200) {
      this.slideOpts = {
        spaceBetween: 10,
        slidesPerView: 3.2,
        loopedSlides: 3,
        loop: true,
        simulateTouch: true,
      };
      this.isSmallSizeScreen = true;
    } else {
      this.isSmallSizeScreen = false;
      this.slideOpts = {
        slidesPerView: 7.5,
        loopedSlides: 5,
        loop: true,
      };
    }
  }

  getTrendMovies() {
    this.service.getTrendingList(this.modelType).subscribe((trendMoviesEl) => {
      this.response = trendMoviesEl.results;
      this.response.forEach((element) => {
        this.results.push({
          id: element.id,
          title: element.title,
          descriptoin: element.overview,
          image: 'http://image.tmdb.org/t/p/original/' + element.poster_path,
          voterRating: element.vote_average,
          modelItem: element,
        });
      });
    });
  }

  getTopRatedMovies() {
    this.service.getTopRatedList().subscribe((topMoviesEl) => {
      this.topRatedResponse = topMoviesEl.results;
      this.topRatedResponse.forEach((element) => {
        this.topRatedResults.push({
          id: element.id,
          title: element.title,
          descriptoin: element.overview,
          image: 'http://image.tmdb.org/t/p/original/' + element.poster_path,
          voterRating: element.vote_average,
          modelItem: element,
        });
      });
    });
  }

  /*
  * Videa z now play movie listu
  getNowPlayMovies() {
    this.service.getNowPlayingList().subscribe((nowMoviesEl) => {
      //console.log(nowMoviesEl);
      this.nowResponse = nowMoviesEl.results;
      this.response.forEach((element) => {
        this.results.push({
          id: element.id,
          title: element.title,
          descriptoin: element.overview,
          image: 'http://image.tmdb.org/t/p/original/' + element.poster_path,
          voterRating: element.vote_average,
          modelItem: element,
        });
      });
      nowMoviesEl.results.forEach((element) => {
        const playID = element.id;
        this.service.getVideoList(playID).subscribe((videoEl) => {
          //console.log('videos', videoEl);
          videoEl.results.forEach((video) => {
            if (
              videoEl.results.length > 1 &&
              video.name.includes('Official Trailer')
            ) {
              videoEl.results.length = 1;
              //console.log(video);
              //console.log(video);
              const videoE = 'https://www.youtube.com/embed/' + video.key;

              this.videoDangerousUrl =
                this.sanitizer.bypassSecurityTrustResourceUrl(videoE);

              this.videoUrl.push({
                videoAfter: this.videoDangerousUrl,
              });
              //console.log(this.videoUrl);
            }
          });
        });
      });
    });
  }
  */

  getDiscoverMovie() {
    this.page = 1;
    // this.discoverResults = [];

    const page = Math.floor(Math.random() * (500 - 1) + 1) + 1;
    console.log(page);
    const movie = Math.floor(Math.random() * 19);
    console.log(movie);

    this.service.getDiscoverList(page).subscribe((discMoviesEl) => {
      // console.log('discover', discMoviesEl);
      this.discoverResponse = discMoviesEl.results[movie];
      console.log('movie', this.discoverResponse);
      // this.initializeContainer();
    });
  }

  // initializeContainer() {
  //   this.title = this.discoverResponse.title;
  //   // console.log(this.title);
  //   this.image =
  //     'http://image.tmdb.org/t/p/original/' + this.discoverResponse.poster_path;
  //   // console.log(this.image);
  //   this.id = this.discoverResponse.id;
  //   // console.log(this.id);
  // }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  closeModel() {
    this.service.dismissModel();
  }
}
