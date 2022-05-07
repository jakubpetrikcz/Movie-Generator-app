import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { SliderComponent } from './slider.component';
import { HomePageRoutingModule } from 'src/app/pages/home/home-routing.module';
import { MovieCardComponentModule } from '../movie-card/movie-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule,
    MovieCardComponentModule,
  ],
  declarations: [SliderComponent],
  exports: [SliderComponent],
})
export class SliderComponentModule {}
