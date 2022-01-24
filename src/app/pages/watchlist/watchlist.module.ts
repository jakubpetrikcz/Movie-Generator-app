import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchlistPageRoutingModule } from './watchlist-routing.module';

import { WatchlistPage } from './watchlist.page';
import { ProjectComponentModule } from '../projects/components/project-component/project-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchlistPageRoutingModule,
    ProjectComponentModule,
  ],
  declarations: [WatchlistPage],
})
export class WatchlistPageModule {}
