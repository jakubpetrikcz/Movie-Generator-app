import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchlistPageRoutingModule } from './watchlist-routing.module';

import { WatchlistPage } from './watchlist.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchlistPageRoutingModule,
    HeaderComponentModule,
  ],
  declarations: [WatchlistPage],
})
export class WatchlistPageModule {}
