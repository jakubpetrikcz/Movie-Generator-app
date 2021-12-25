import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  articles: any;
  results: Observable<any>;
  searchTerm = '';

  constructor(private movieService: MovieService) {
    this.searchChanged();
  }

  ngOnInit() {}

  searchChanged() {
    if (this.searchTerm !== '') {
      this.results = this.movieService.searchData(this.searchTerm);
    } else {
      this.results = this.movieService.getPopular();
      console.log(this.results);
      //console.log(news);
    }
  }
}
