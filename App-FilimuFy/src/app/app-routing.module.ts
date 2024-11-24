import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasListComponent } from './components/peliculas-list/peliculas-list.component';
import { SerieListComponent } from './components/serie-list/serie-list.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { SerieDetailsComponent } from './components/serie-details/serie-details.component';
import { PeliculaDetailsComponent } from './components/pelicula-details/pelicula-details.component';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';
import { PantallaIncioComponent } from './components/pantalla-incio/pantalla-incio.component';
import { ApprovedComponent } from './shared/approved/approved.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: 'peliculas', component: PeliculasListComponent},
  {path: 'inicio', component: PantallaIncioComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'series', component: SerieListComponent},
  {path: 'peliculas/:id', component: PeliculaDetailsComponent},
  {path: 'actores/:id', component: ActorDetailsComponent},
  {path: 'actores', component: ActorListComponent},
  {path: 'series/:id', component: SerieDetailsComponent},
  {path: 'approved', component: ApprovedComponent},
  { path: 'search', component: SearchComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
