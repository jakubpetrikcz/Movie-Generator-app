import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  modelType: 'movie';

  id: string;
  title: string;
  backGroundImage: string;
  posterImage: string;
  releaseDate: string;
  overview: string;
  voterRating: any;
  runTime: string;
  genres: any = [];
  crewItemList: any = [];
  castItemList: any = [];
  directorName: string;
  directorImage: string;

  isMobile = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private platform: Platform
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(typeof id);

    this.movieService.getDetailList(id).subscribe((detailResult) => {
      this.genres = detailResult.genres;
      this.title = detailResult.title;
      this.backGroundImage =
        'http://image.tmdb.org/t/p/original/' + detailResult.backdrop_path;
      this.posterImage =
        'http://image.tmdb.org/t/p/w116_and_h174_face/' +
        detailResult.poster_path;
      this.releaseDate = detailResult.release_date;
      this.overview = detailResult.overview;
      this.voterRating = detailResult.vote_average;
      this.runTime = this.calcTime(detailResult.runtime);
    });

    this.movieService.getCreditList(id).subscribe((creditResult) => {
      this.crewItemList = creditResult.crew;
      this.castItemList = creditResult.cast;

      this.crewItemList.filter((member) => {
        if (member.job === 'Director') {
          this.directorName = member.name;
          this.directorImage =
            'https://www.themoviedb.org/t/p/w138_and_h175_face/' +
            member.profile_path;
        }
      });

      this.castItemList.forEach((actor) => {
        if (actor.profile_path) {
          actor.profile_path =
            'https://www.themoviedb.org/t/p/w138_and_h175_face/' +
            actor.profile_path;
        }
        this.crewItemList.push(actor);
      });
    });
  }

  isMobileSize() {
    if (this.platform.width() <= 820) {
      return this.isMobile;
    }
  }

  calcTime = (time) => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
  };

  getItems() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.movieService.getDetailList(id).subscribe((changesDetail) => {
      const items = [];
      if (JSON.parse(localStorage.getItem('items')) === null) {
        items.push(changesDetail);

        localStorage.setItem('items', JSON.stringify(items));
      } else {
        const localItems = JSON.parse(localStorage.getItem('items'));
        localItems.map((details) => {
          if (changesDetail.id !== details.id) {
            if (items[changesDetail.title] === undefined) {
              items[changesDetail.title] = changesDetail.title;
            }
            items.push(details);
          }
        });
        items.push(changesDetail);
        localStorage.setItem('items', JSON.stringify(items));
      }
    });
  }
}
