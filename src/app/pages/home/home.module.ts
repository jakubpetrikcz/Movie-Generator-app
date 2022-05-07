import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SwiperModule } from 'swiper/angular';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { MovieCardComponentModule } from 'src/app/components/movie-card/movie-card.module';
import { SliderComponentModule } from 'src/app/components/slider/slider.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    MovieCardComponentModule,
    SwiperModule,
    HeaderComponentModule,
    SliderComponentModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
