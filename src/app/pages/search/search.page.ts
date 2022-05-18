import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  results: any = [];
  response: any;

  searchText: string;
  page: number = 1;
  loadingCurrentEventData: any;

  constructor(private service: MovieService) {
    this.searchText = '';
  }

  ngOnInit() {
    this.filterData();
  }

  segmentChanged(event: any) {
    this.results = [];
    this.page = 1;
    this.searchText = event.target.value;
    this.filterData();
  }

  filterData() {
    if (this.searchText.length !== 0) {
      this.loadSearchContainer();
    } else {
      this.getPopularMovies();
    }
  }

  loadSearchContainer() {
    this.service
      .getSearchList(this.page, this.searchText)
      .subscribe((searchResponseEl) => {
        this.response = searchResponseEl.results;
        this.response.forEach((element: any) => {
          this.results.push({
            id: element.id,
            title: element.title,
            description: element.overview,
            image: 'https://image.tmdb.org/t/p/w500/' + element.poster_path,
            voterRating: element.vote_average,
            modelItem: element,
          });
        });

        if (this.page > 1) {
          this.loadingCurrentEventData.target.complete();
          if (searchResponseEl.results.length === 0) {
            this.loadingCurrentEventData.target.disabled = true;
          }
        }
      });
  }

  loadData(event: any) {
    this.page = this.page + 1;
    this.loadingCurrentEventData = event;
    if (this.searchText.length !== 0) {
      this.loadSearchContainer();
    } else {
      this.getPopularMovies();
    }
  }

  getPopularMovies() {
    this.service.getPopularList(this.page).subscribe((trendMoviesEl) => {
      this.response = trendMoviesEl.results;
      this.response.forEach((element: any) => {
        this.results.push({
          id: element.id,
          title: element.title,
          descriptoin: element.overview,
          image: 'https://image.tmdb.org/t/p/w500/' + element.poster_path,
          voterRating: element.vote_average,
          modelItem: element,
        });
      });

      if (this.page > 1) {
        this.loadingCurrentEventData.target.complete();
        if (trendMoviesEl.results.length === 0) {
          this.loadingCurrentEventData.target.disabled = true;
        }
      }
    });
  }
}
