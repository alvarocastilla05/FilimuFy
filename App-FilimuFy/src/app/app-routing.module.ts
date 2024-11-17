import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasListComponent } from './components/peliculas-list/peliculas-list.component';
import { SerieListComponent } from './components/serie-list/serie-list.component';

const routes: Routes = [
  {path: 'peliculas', component: PeliculasListComponent},
  {path: 'series',component: SerieListComponent},
  {path: '', redirectTo: 'peliculas', pathMatch: 'full'}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
