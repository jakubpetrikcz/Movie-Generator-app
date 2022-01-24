import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {
  results: any = [];
  constructor() {}

  ionViewWillEnter() {
    this.getData();
  }

  ngOnInit() {}

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
