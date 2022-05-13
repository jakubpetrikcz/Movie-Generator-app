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
      trendMoviesEl.results.forEach((element: any) => {
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
      topMoviesEl.results.forEach((element: any) => {
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
