import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasListComponent } from './components/peliculas-list/peliculas-list.component';
import { SerieListComponent } from './components/serie-list/serie-list.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { SerieDetailsComponent } from './components/serie-details/serie-details.component';

import { PeliculaDetailsComponent } from './components/pelicula-details/pelicula-details.component';

const routes: Routes = [
  {path: 'peliculas', component: PeliculasListComponent},
  {path: '', redirectTo: 'peliculas', pathMatch: 'full'},
  {path: 'series', component: SerieListComponent},
  {path: 'peliculas/:id', component: PeliculaDetailsComponent},
  {path: 'actores', component: ActorListComponent},
  {path: 'series/:id', component: SerieDetailsComponent},
  {path: '', redirectTo: 'peliculas', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
