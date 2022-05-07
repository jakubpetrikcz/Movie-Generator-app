import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieCardComponent } from './movie-card.component';
import { HomePageRoutingModule } from 'src/app/pages/home/home-routing.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [MovieCardComponent],
  exports: [MovieCardComponent]
})
export class MovieCardComponentModule {}