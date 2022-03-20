import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {
  results: any = [];
  isMobile = true;

  constructor(private platform: Platform) {}

  ionViewWillEnter() {
    this.getData();
  }

  ngOnInit() {}

  isMobileSize() {
    if (this.platform.width() <= 820) {
      return this.isMobile;
    }
  }

  getData() {
    this.results = JSON.parse(localStorage.getItem('items'));
  }

  removeItem(e, i: number) {
    const items = [];
    console.log('event', this.results);
    JSON.parse(localStorage.getItem('items')).map((data) => {
      if (data.id !== e.id) {
        items.push(data);
      } else {
        this.results.splice(i, 1);
      }
    });
    localStorage.setItem('items', JSON.stringify(items));

    if (items.length === 0) {
      localStorage.clear();
    }
  }
}
