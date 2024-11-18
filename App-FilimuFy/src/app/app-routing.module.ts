import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasListComponent } from './components/peliculas-list/peliculas-list.component';
import { SerieListComponent } from './components/serie-list/serie-list.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { SerieDetailsComponent } from './components/serie-details/serie-details.component';

const routes: Routes = [
  {path: 'peliculas', component: PeliculasListComponent},
  {path: 'series',component: SerieListComponent},
  {path: 'actores', component: ActorListComponent},
  {path: 'series/:id', component: SerieDetailsComponent},
  {path: '', redirectTo: 'peliculas', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
