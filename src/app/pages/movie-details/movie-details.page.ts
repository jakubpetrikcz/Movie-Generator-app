import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  information = null;
  credits = null;
  directors = null;
  actors = null;
  genres = null;
  time = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.movieService.getDetails(id).subscribe((result) => {
      console.log('details: ', result);
      console.log('genres: ', result['genres']);
      this.information = result;

      const genresName = this.information.genres.map(
        (genreName) => genreName.name
      );
      console.log(genresName);
      this.genres = genresName;

      this.time = this.movieService.calcTime(this.information.runtime);
      console.log(this.time);
    });

    this.movieService.getCredits(id).subscribe((resultCredits) => {
      console.log('credits: ', resultCredits);
      this.credits = resultCredits;

      const director = this.credits.crew.filter(
        (member) => member.job === 'Director'
      );
      console.log('Directors: ', director[0].name);
      this.directors = director[0].name;

      this.actors = this.credits.cast;
    });
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }
}
