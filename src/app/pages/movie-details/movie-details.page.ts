import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  modelType: 'movie';

  movie: any = [];

  id: string;
  voterRating: any;
  runTime: string;
  crewItemList: any = [];
  castItemList: any = [];
  directorName: string;
  directorImage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.movieService.getDetailList(id).subscribe((detailResult) => {
      this.movie = detailResult;
      this.voterRating = detailResult.vote_average;
      this.runTime = this.calcTime(detailResult.runtime);
    });

    this.movieService.getCreditList(id).subscribe((creditResult) => {
      this.crewItemList = creditResult.crew;
      this.castItemList = creditResult.cast;

      this.crewItemList.filter((member: any) => {
        if (member.job === 'Director') {
          this.directorName = member.name;
          this.directorImage =
            'https://www.themoviedb.org/t/p/w138_and_h175_face/' +
            member.profile_path;
        }
      });

      this.castItemList.forEach((actor: any) => {
        if (actor.profile_path) {
          actor.profile_path =
            'https://www.themoviedb.org/t/p/w138_and_h175_face/' +
            actor.profile_path;
        }
        this.crewItemList.push(actor);
      });
    });
  }

  calcTime = (time: any) => {
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
