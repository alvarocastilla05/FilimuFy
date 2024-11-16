import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasListComponent } from './components/peliculas-list/peliculas-list.component';
import { PeliculaDetailsComponent } from './components/pelicula-details/pelicula-details.component';

const routes: Routes = [
  {path: 'peliculas', component: PeliculasListComponent},
  {path: '', redirectTo: 'peliculas', pathMatch: 'full'},
  {path: 'peliculas/:id', component: PeliculaDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
