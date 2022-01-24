import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { HomePage } from 'src/app/pages/home/home.page';
import { MovieService } from 'src/app/services/movie.service';
import { ThemoviedbService } from '../../api/service/themoviedb.service';

@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss'],
})
export class ModelPageComponent implements OnInit {
  @Input() modelItemList: any;
  @Input() modelType: any;

  isLoading: boolean;
  id: string;
  title: string;
  image: string;
  backGroundImage: string;
  releaseDate: string;
  overview: string;
  castItemList: any = [];
  crewItemList: any = [];
  runTime: string;
  voterRating: any;
  appRecommendationsContainer: any = [];
  isVideoEnabled: boolean;
  dangerousVideoUrl: string;
  videoUrl: any;

  constructor(
    private movieService: ThemoviedbService,
    private sanitizer: DomSanitizer,
    private service: MovieService
  ) {}

  ngOnInit() {
    //this.initializeContainer();
  }

  container() {
    //this.homePage.getDiscoverMovie();
    //this.initializeContainer();
  }

  /*
  initializeContainer() {
    this.isLoading = true;
    this.title =
      this.modelType === 'movie'
        ? this.modelItemList.detailResponseEl.title
        : this.modelItemList.detailResponseEl.original_name;
    this.id = this.modelItemList.detailResponseEl.id;
    this.backGroundImage =
      'http://image.tmdb.org/t/p/original/' +
      this.modelItemList.detailResponseEl.backdrop_path;
    this.overview = this.modelItemList.detailResponseEl.overview;
    this.releaseDate = this.modelItemList.detailResponseEl.release_date;
    this.runTime = this.modelItemList.detailResponseEl.runtime + 'Minutes';
    this.voterRating =
      'User Score : ' +
      Number(this.modelItemList.vote_average * 10).toFixed(2) +
      '%';
    this.modelItemList.creditsResponseEl.cast.forEach((element) => {
      if (element.profile_path) {
        element.profile_path =
          'https://www.themoviedb.org/t/p/w138_and_h175_face/' +
          element.profile_path;
      }
      this.castItemList.push(element);
    });

    this.modelItemList.creditsResponseEl.crew.forEach((element) => {
      if (element.profile_path) {
        element.profile_path =
          'https://www.themoviedb.org/t/p/w138_and_h175_face/' +
          element.profile_path;
      }
      this.crewItemList.push(element);
    });

    if (this.modelItemList.videos.results.length > 0) {
      this.dangerousVideoUrl =
        'https://www.youtube.com/embed/' +
        this.modelItemList.videos.results[0].key;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.dangerousVideoUrl
      );
    }

    this.initializeRecommendationsContainer();
  }

  */

  /*
  initializeRecommendationsContainer() {
    this.movieService
      .getRecommendationList(this.modelType, this.id)
      .subscribe((responseEl) => {
        responseEl.results.forEach((element) => {
          this.appRecommendationsContainer.push({
            id: element.id,
            title:
              this.modelType === 'movie'
                ? element.title
                : element.original_name,
            descriptoin: element.overview,
            image: 'http://image.tmdb.org/t/p/original/' + element.poster_path,
            voterRating: element.vote_average,
            modelItem: element,
          });
        });

        this.isLoading = false;
      });
  }

  cardEventListener(modelItem) {
    /** to avoid video playing in background
    this.isVideoEnabled = false;
    forkJoin(
      this.movieService.getDetailList(this.modelType, modelItem.id),
      this.movieService.getCreditList(this.modelType, modelItem.id),
      this.movieService.getVideoList(this.modelType, modelItem.id)
    ).subscribe((responseEl) => {
      modelItem.detailResponseEl = responseEl[0];
      modelItem.creditsResponseEl = responseEl[1];
      modelItem.videos = responseEl[2];
      //this.movieService.presentModal(modelItem, this.modelType);
    });
  }

  playVideo() {
    this.isVideoEnabled = true;
  }
  */
}
