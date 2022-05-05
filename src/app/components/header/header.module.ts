import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { MovieCardComponentModule } from '../movie-card/movie-card.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, MovieCardComponentModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {}