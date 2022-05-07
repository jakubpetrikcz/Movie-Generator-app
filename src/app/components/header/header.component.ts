import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() name: string;
  @Input() showBtn: boolean;
  @Input() showSearchBar: boolean;
  @Input() searchText: string;
  // @Input() setSearchText: any;
  @Output() setSearchText = new EventEmitter<any>();
  // @Output() valueUpdated = new EventEmitter<Function>();

  discoverResponse: any;
  // imageUrl: "http://image.tmdb.org/t/p/original/";

  constructor(
    private service: MovieService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getDiscoverMovie();
  }

  handleInputChange($event: any) {
    // ... all of your logic
    this.setSearchText.emit($event); // this will pass the $event object to the parent component.
  }

  getDiscoverMovie() {
    // this.page = 1;
    // this.discoverResults = [];

    const page = Math.floor(Math.random() * (500 - 1) + 1) + 1;
    console.log(page);
    const movie = Math.floor(Math.random() * 19);
    console.log(movie);

    this.service.getDiscoverList(page).subscribe((discMoviesEl) => {
      // console.log('discover', discMoviesEl);
      this.discoverResponse = discMoviesEl.results[movie];
      console.log('movie', this.discoverResponse);
      // this.initializeContainer();
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
