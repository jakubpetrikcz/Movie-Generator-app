import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },

  /*
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
  },
  */
  /*
  {
    path: 'tab2',
    loadChildren: () =>
      import('./pages/tab2/tab2.module').then((m) => m.Tab2PageModule),
  },
  {
    path: 'tab2/:id',
    loadChildren: () =>
      import('./pages/movie-details/movie-details.module').then(
        (m) => m.MovieDetailsPageModule
      ),
  },
  */
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
