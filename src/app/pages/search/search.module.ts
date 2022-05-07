import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { MovieCardComponentModule } from 'src/app/components/movie-card/movie-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    HeaderComponentModule,
    MovieCardComponentModule,
  ],
  declarations: [SearchPage],
})
export class SearchPageModule {}
