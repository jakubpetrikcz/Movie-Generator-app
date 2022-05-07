import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
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
  selectedValue: any;
  page: number = 1;
  searchCardContainer: any = [];
  loadingCurrentEventData: any;

  popularList: any = [];

  modelType = 'movie';
  filteredGenreId: string;

  isMobile = true;

  constructor(private service: MovieService, private platform: Platform) {
    this.searchText = '';
    this.selectedValue = 'movie';
  }

  ngOnInit() {
    this.filterData();
  }

  isMobileSize() {
    if (this.platform.width() <= 820) {
      return this.isMobile;
    }
  }

  segmentChanged(event: any) {
    console.log('ahoj');
    this.results = [];
    this.page = 1;
    this.searchText = event.target.value;
    console.log(this.searchText);
    this.filterData();
  }

  filterData() {
    if (this.searchText.length !== 0) {
      this.loadSearchContainer();
    } else {
      this.getPopularMovies();
    }
  }

  // loadData(ev: any) {
  //   this.page = this.page + 1;

  //   console.log(this.page);
  //   this.filterData();
  //   console.log("Loaded data");
  //   ev.target.complete();
  // }

  filterList() {
    this.page = 1;
    this.results = [];
    console.log('Ahoj');

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
        console.log(searchResponseEl);
        this.response = searchResponseEl.results;
        this.response.forEach((element) => {
          this.results.push({
            id: element.id,
            title:
              this.selectedValue === 'movie'
                ? element.title
                : element.original_name,
            descriptoin: element.overview,
            image: element.poster_path
              ? 'http://image.tmdb.org/t/p/original/' + element.poster_path
              : '../../assets/poster-holder.jpg',
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

  loadData(event) {
    this.page = this.page + 1;
    this.loadingCurrentEventData = event;
    // console.log(this.loadingCurrentEventData);
    console.log(this.page);
    if (this.searchText.length !== 0) {
      this.loadSearchContainer();
    } else {
      this.getPopularMovies();
    }
  }

  selectionChanged() {
    this.results = [];
    this.searchText = '';
    this.page = 1;
  }

  getPopularMovies() {
    this.service.getPopularList(this.page).subscribe((trendMoviesEl) => {
      console.log(trendMoviesEl);
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

      if (this.page > 1) {
        this.loadingCurrentEventData.target.complete();
        if (trendMoviesEl.results.length === 0) {
          this.loadingCurrentEventData.target.disabled = true;
        }
      }
    });
  }
}
