import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieCardComponent } from './movie-card.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [MovieCardComponent],
  exports: [MovieCardComponent]
})
export class MovieCardComponentModule {}