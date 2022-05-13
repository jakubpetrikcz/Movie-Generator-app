import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() title: string;
  @Input() imgSrc: string;
  @Input() router: string;
  @Input() voterRating: number;
  @Input() isAddBtn?: boolean;
  @Input() isRatingBtn?: boolean;
  @Input() isRemoveBtn?: boolean;
  @Input() item?: [];
  @Input() movies?: {};
  @Input() index?: number;
  @Output() removeFunction = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onMyClick(movies: any, index: any) {
    this.removeFunction.emit({movies, index});
  }

  getItems(data: any) {
    const items = [];
    if (JSON.parse(localStorage.getItem('items') || '[]') === null) {
      items.push(data);
      localStorage.setItem('items', JSON.stringify(items));
    } else {
      const localItems = JSON.parse(localStorage.getItem('items') || '[]');
      localItems.map((details: any) => {
        if (data.id !== details.id) {
          if (items[data.title] === undefined) {
            items[data.title] = data.title;
          }
          items.push(details);
        }
      });
      items.push(data);
      localStorage.setItem('items', JSON.stringify(items));
    }
  }
}
