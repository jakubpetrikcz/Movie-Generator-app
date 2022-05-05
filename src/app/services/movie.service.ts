import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { tap, map, switchMap, delay } from 'rxjs/operators';
import { CachingService } from './caching.service';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url = 'https://api.themoviedb.org/3';
  currentModel = [];
  connected = true;

  constructor(
    private http: HttpClient,
    private cachingService: CachingService,
    private toastController: ToastController,
    public modalController: ModalController
  ) {
    /*
    * Network status
    Network.addListener('networkStatusChange', async (status) => {
      this.connected = status.connected;
    });

    this.toastController.create({ animated: false }).then((t) => {
      t.present();
      t.dismiss();
    });
    */
  }

  getGenreList(type: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getTrendingList(type: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/trending/${type}/day?api_key=${apiKey}&language=en-US`;
    console.log(requestURL);
    return this.http.get(requestURL);
  }

  getPopularList(type: string, page: number, genres: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=${page}&with_genres=${genres}`;
    return this.http.get(requestURL);
  }

  getDetailList(id: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    const storedValue = from(this.cachingService.getCachedRequest(requestURL));
    return storedValue.pipe(
      switchMap((result) => {
        if (!result) {
          return this.callAndCache(requestURL);
        } else {
          return of(result);
        }
      })
    );

    //return this.http.get(requestURL);
  }

  callAndCache(url): Observable<any> {
    return this.http.get(url).pipe(
      delay(500),
      tap((res) => {
        this.cachingService.cacheRequests(url, res);
      })
    );
  }

  getCreditList(id: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  getRecommendationList(type: string, id: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }

  dismissModel() {
    this.currentModel[this.currentModel.length - 1].dismiss().then(() => {
      this.currentModel.pop();
    });
  }

  getSearchList(type: string, page: number, query: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&language=en-US&page=${page}&query=${query}`;
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

  getVideoList(id: string): Observable<any> {
    const requestURL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
    return this.http.get(requestURL);
  }
}
