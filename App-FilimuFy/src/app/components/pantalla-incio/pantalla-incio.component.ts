import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { PeliculaService } from '../../services/pelicula.service';
import { ActorService } from '../../services/actor.service';
import { TVShowService } from '../../services/tvshow.service';
import { TVShow } from '../../interfaces/serie/tv.interface';
import { Actor } from '../../interfaces/actor/actores-list.interface';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-pantalla-incio',
  templateUrl: './pantalla-incio.component.html',
  styleUrl: './pantalla-incio.component.css'
})
export class PantallaIncioComponent implements OnInit {

  listaPeliculas: Pelicula[] = [];
  listaSeries: TVShow[] = [];
  listaActores: Actor[] = [];

  constructor(private peliculaService: PeliculaService,
              private serieService: TVShowService,
              private actorService: ActorService,
              private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.peliculaService.getPeliculas()
      .subscribe(resp => {
        this.listaPeliculas = resp.results.slice(0, 4);
      });

    this.serieService.getSeries()
      .subscribe(resp2 => {
        this.listaSeries = resp2.results.slice(0, 4);
      });

    this.actorService.getActores()
      .subscribe(resp3 => {
        this.listaActores = resp3.results.slice(0, 4);
      });
  }
  
  getTexto(key: string): string {
    return this.configService.getTexto(key);
  }

}
