import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../modules/material.module';
import { MenuNavComponent } from './shared/menu-nav/menu-nav.component';
import { PeliculasListComponent } from './components/peliculas-list/peliculas-list.component';
import { provideHttpClient } from '@angular/common/http';
import { PeliculaCardComponent } from './components/pelicula-card/pelicula-card.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { ScreenComponent } from './components/screen/screen.component';
import { PeliculaDetailsComponent } from './components/pelicula-details/pelicula-details.component';
import { HorasMinPipe } from './pipes/horasMin.pipe';
import { AverageColorPipe } from './pipes/averageColor.pipe';
import { SerieCardComponent } from './components/serie-card/serie-card.component';
import { SerieListComponent } from './components/serie-list/serie-list.component';
import { StatusColorPipe } from './pipes/statusColor.pipe';
import { ActorCardComponent } from './components/actor-card/actor-card.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';
import { SerieDetailsComponent } from './components/serie-details/serie-details.component';
import { EdadColorPipe } from './pipes/EdadColor.pipe';
import { EdadFondoColorPipe } from './pipes/EdadFondoColor.pipe';
import { StatusSeriesColorPipe } from './pipes/statusSeriesColor.pipe';
import { PantallaIncioComponent } from './components/pantalla-incio/pantalla-incio.component';
import { ApprovedComponent } from './shared/approved/approved.component';
import { AvatarFotoPipe } from './pipes/avatarFoto.pipe';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { MisValoracionesListComponent } from './components/mis-valoraciones-list/mis-valoraciones-list.component';
import { FavoritosListComponent } from './components/favoritos-list/favoritos-list.component';
import { WatchlistListComponent } from './components/watchlist-list/watchlist-list.component';
import { ListasUsuarioComponent } from './components/listas-usuario/listas-usuario.component';
import { ListaDetailsComponent } from './components/lista-details/lista-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    PeliculasListComponent,
    PeliculaCardComponent,
    ImagenPipe,
    HorasMinPipe,
    AverageColorPipe,
    StatusColorPipe,
    StatusSeriesColorPipe,
    EdadColorPipe,
    EdadFondoColorPipe,
    ScreenComponent,
    PeliculaDetailsComponent,
    SerieCardComponent,
    SerieListComponent,
    ActorCardComponent,
    ActorListComponent,
    ActorDetailsComponent,
    SerieDetailsComponent,
    PantallaIncioComponent,
    ApprovedComponent,
    AvatarFotoPipe,
    SearchComponent,
    MisValoracionesListComponent,
    FavoritosListComponent,
    WatchlistListComponent,
    ListasUsuarioComponent,
    ListaDetailsComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
