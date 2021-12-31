import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { tap, map, switchMap, delay } from 'rxjs/operators';
import { CachingService } from './caching.service';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';

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

  connected = true;
  //url1 = `${this.url}movie/popular?api_key=${this.apiKey}&language=en-US`;

  constructor(
    private http: HttpClient,
    private cachingService: CachingService,
    private toastController: ToastController
  ) {
    Network.addListener('networkStatusChange', async (status) => {
      this.connected = status.connected;
    });

    this.toastController.create({ animated: false }).then((t) => {
      t.present();
      t.dismiss();
    });
  }

  getUsers(forceRefresh) {
    const url1 = `${this.url}movie/popular?api_key=${this.apiKey}&language=en-US`;
    return this.getPopular(url1, forceRefresh).pipe(
      map((res: any) => res.results)
    );
  }

  getData(id, forceRefresh) {
    const url2 = `${this.url}movie/${id}?api_key=${this.apiKey}`;
    return this.getDetails(url2, forceRefresh);
  }

  searchData(title: string): Observable<any> {
    return this.http
      .get(
        `${this.url}search/movie?api_key=${
          this.apiKey
        }&language=en-US&query=${encodeURI(title)}`
      )
      .pipe(
        map((results: any) => {
          console.log('RAW: ', results);
          return results.results;
        })
      );
  }

  getDetails(url2, forceRefresh: boolean = false): Observable<any> {
    if (!this.connected) {
      this.toastController
        .create({
          message: 'You are viewing offline data.',
          duration: 2000,
        })
        .then((toast) => {
          toast.present();
        });
      return from(this.cachingService.getCachedRequest(url2));
    }
    if (!forceRefresh) {
      return this.callAndCache(url2);
    } else {
      const storedValue = from(this.cachingService.getCachedRequest(url2));
      return storedValue.pipe(
        switchMap((result) => {
          if (!result) {
            return this.callAndCache(url2);
          } else {
            return of(result);
          }
        })
      );
    }
  }

  getCredits(id) {
    return this.http.get(
      `${this.url}movie/${id}/credits?api_key=${this.apiKey}`
    );
  }

  getPopular(url1, forceRefresh: boolean = false): Observable<any> {
    if (!this.connected) {
      this.toastController
        .create({
          message: 'You are viewing offline data.',
          duration: 2000,
        })
        .then((toast) => {
          toast.present();
        });
      return from(this.cachingService.getCachedRequest(url1));
    }
    if (!forceRefresh) {
      return this.callAndCache(url1);
    } else {
      const storedValue = from(this.cachingService.getCachedRequest(url1));
      return storedValue.pipe(
        switchMap((result) => {
          if (!result) {
            return this.callAndCache(url1);
          } else {
            return of(result);
          }
        })
      );
    }
  }

  callAndCache(url): Observable<any> {
    return this.http.get(url).pipe(
      delay(500),
      tap((res) => {
        this.cachingService.cacheRequests(url, res);
      })
    );
  }

  calcTime = (time) => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
  };
}
