import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() setSearchText = new EventEmitter<any>();

  discoverResponse: any;

  constructor(
    private service: MovieService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getDiscoverMovie();
  }

  handleInputChange($event: any) {
    this.setSearchText.emit($event);
  }

  getDiscoverMovie() {
    const page = Math.floor(Math.random() * (500 - 1) + 1) + 1;
    const movie = Math.floor(Math.random() * 19);

    this.service.getDiscoverList(page).subscribe((discMoviesEl) => {
      this.discoverResponse = discMoviesEl.results[movie];
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
