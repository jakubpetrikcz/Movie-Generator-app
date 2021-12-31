import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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

  constructor(
    private movieService: MovieService,
    private loadingController: LoadingController
  ) {
    this.searchChanged();
  }

  ngOnInit() {}

  searchChanged() {
    if (this.searchTerm !== '') {
      this.results = this.movieService.searchData(this.searchTerm);
    } else {
      const refresh = event ? true : false;
      this.results = this.movieService.getUsers(refresh);
      console.log(this.results);
    }
  }

  async refreshUsers(event?) {
    const loading = await this.loadingController.create({
      message: 'Loading data..',
    });
    await loading.present();

    const refresh = event ? true : false;

    this.results = this.movieService.getUsers(refresh).pipe(
      finalize(() => {
        if (event) {
          event.target.complete();
        }
        loading.dismiss();
      })
    );
  }
}
