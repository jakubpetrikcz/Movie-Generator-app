import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() title: string;
  @Input() isTrend: boolean;

  trendsList: any = [];
  topList: any = [];

  constructor(private service: MovieService) {}

  ngOnInit() {
    this.getTrendMovies();
    this.getTopRatedMovies();
  }

  getTrendMovies() {
    this.service.getTrendingList().subscribe((trendMoviesEl) => {
      // this.response = trendMoviesEl.results;
      console.log(trendMoviesEl);
      trendMoviesEl.results.forEach((element) => {
        this.trendsList.push({
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
      // this.topRatedResponse = topMoviesEl.results;
      topMoviesEl.results.forEach((element) => {
        this.topList.push({
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
}
