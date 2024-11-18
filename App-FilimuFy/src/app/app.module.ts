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

@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    PeliculasListComponent,
    PeliculaCardComponent,
    ImagenPipe,
    HorasMinPipe,
    AverageColorPipe,
    ScreenComponent,
    PeliculaDetailsComponent,
    SerieCardComponent,
    SerieListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
