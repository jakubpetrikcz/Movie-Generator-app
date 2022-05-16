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

  trendsList: [];
  topList: any = [];

  constructor(private service: MovieService) {}

  ngOnInit() {
    this.getTrendMovies();
    this.getTopRatedMovies();
  }

  getTrendMovies() {
    this.service.getTrendingList().subscribe((trendMoviesEl) => {
      this.trendsList = trendMoviesEl.results;
    });
  }

  getTopRatedMovies() {
    this.service.getTopRatedList().subscribe((topMoviesEl) => {
      this.topList = topMoviesEl.results;
    });
  }
}
