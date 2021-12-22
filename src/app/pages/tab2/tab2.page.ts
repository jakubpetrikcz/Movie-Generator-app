import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  datauser: any;

  constructor(public api: MovieService) {}

  ngOnInit() {
    this.getDataUser();
  }

  async getDataUser() {
    await this.api.getDataUser().subscribe(
      (res) => {
        console.log(res);
        this.datauser = res.results;
        console.log(this.datauser);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /*
  searchChanged() {
    this.results = this.movieService.searchData(this.searchTerm, this.type);
  }
  */
}
