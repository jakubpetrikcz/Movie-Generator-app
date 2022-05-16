import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url = 'https://api.themoviedb.org/3';

  constructor(
    private http: HttpClient,
    public modalController: ModalController
  ) {}

  getGenreList(type: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getTrendingList(): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getPopularList(page: number): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    return this.http.get(requestURL);
  }

  getDetailList(id: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getCreditList(id: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getSearchList(page: number, query: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${page}&query=${query}`;
    return this.http.get(requestURL);
  }

  getDiscoverList(page: number): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page}`;
    return this.http.get(requestURL);
  }

  getTopRatedList(): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    return this.http.get(requestURL);
  }
}
