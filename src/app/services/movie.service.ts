import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

/*
const apiUrl =
  'https://api.themoviedb.org/3/movie/popular?api_key=b6099557b06d992c34b3851b02a36032';

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
*/

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url = 'https://api.themoviedb.org/3/';
  apiKey = 'b6099557b06d992c34b3851b02a36032';

  constructor(private http: HttpClient) {}

  searchData(title: string): Observable<any> {
    return this.http
      .get(
        `${this.url}search/movie?api_key=${
          this.apiKey
        }&language=en-US&query=${encodeURI(title)}`
      )
      .pipe(
        map((results) => {
          console.log('RAW: ', results);
          return results['results'];
        })
      );
  }

  getDetails(id) {
    return this.http.get(`${this.url}movie/${id}?api_key=${this.apiKey}`);
  }

  getCredits(id) {
    return this.http.get(
      `${this.url}movie/${id}/credits?api_key=${this.apiKey}`
    );
  }

  getPopular() {
    return this.http
      .get(`${this.url}movie/popular?api_key=${this.apiKey}&language=en-US`)
      .pipe(
        map((results) => {
          console.log('RAW: ', results);
          return results['results'];
        })
      );
  }

  calcTime = (time) => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
  };
}
