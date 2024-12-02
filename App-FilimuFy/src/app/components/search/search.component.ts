import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';
import { TVShowService } from '../../services/tvshow.service';
import { Pelicula } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { TVShow } from '../../interfaces/serie/tv.interface';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../interfaces/actor/actores-list.interface';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  listaPeliculas: Pelicula[] = [];
  listaSeries: TVShow[] = [];
  listaActores: Actor[] = [];
  keyId: number | undefined;
  keyName: string | undefined;

  currentPage: number = 1; // Página inicial para keyId
  loading: boolean = false; // Estado de carga

  showPeliculas: boolean = true; // Mostrar películas al cargar la página
  showSeries: boolean | undefined; // Mostrar series al cargar la página
  showActores: boolean | undefined; // Mostrar actores al cargar la página

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private serieService: TVShowService,
    private actorService: ActorService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'];
      this.keyId = params['keyId']; // Convertir a número
      this.keyName = params['keyName'];
      this.currentPage = 1; // Reiniciar la página al cambiar los parámetros
      this.listaPeliculas = []; // Reiniciar lista de películas

      if (this.query) {
        // Buscar películas y series
        this.buscarPeliculas();
        this.buscarSeries();
        this.buscarActores();
      }

      if (this.keyId) {
        // Filtrar películas por keyId
        this.filtrarPeliculasPorKeyId();
        this.filtrarSeriesPorKeyId();
      }
    });
  }

  buscarPeliculas(): void {
    this.peliculaService.searchPeliculas(this.query).subscribe((resp) => {
      this.listaPeliculas = resp.results;
    });
  }

  buscarSeries(): void {
    this.serieService.searchSeries(this.query).subscribe((resp) => {
      this.listaSeries = resp.results;
    });
  }

  buscarActores(): void {
    this.actorService.searchActores(this.query).subscribe((resp) => {
      this.listaActores = resp.results;
    });
  }


  filtrarPeliculasPorKeyId(append: boolean = false): void {
    this.loading = true; // Iniciar estado de carga
    this.peliculaService.getPeliculasPorPalabraClave(this.keyId!, this.currentPage).subscribe(
      (resp) => {
        if (append) {
          // Agregar nuevas películas a la lista existente
          this.listaPeliculas = [...this.listaPeliculas, ...resp.results];
        } else {
          // Reemplazar lista con los resultados actuales
          this.listaPeliculas = resp.results;
        }
        this.loading = false; // Finalizar estado de carga
      });
  }

  filtrarSeriesPorKeyId(append: boolean = false): void {
    this.loading = true; // Iniciar estado de carga
    this.serieService.getSeriesPorPalabraClave(this.keyId!, this.currentPage).subscribe(
      (resp) => {
        if (append) {
          // Agregar nuevas series a la lista existente
          this.listaSeries = [...this.listaSeries, ...resp.results];
        } else {
          // Reemplazar lista con los resultados actuales
          this.listaSeries = resp.results;
        }
        this.loading = false; // Finalizar estado de carga
      
      });
  }

  cargarMasPeliculasFiltradas(): void {
    this.currentPage++; // Incrementar la página
    this.filtrarPeliculasPorKeyId(true); // Llamar a la función con `append = true`
  }

  cargarMasSeriesFiltradas(): void {
    this.currentPage++; // Incrementar la página
    this.filtrarSeriesPorKeyId(true); // Llamar a la función con `append = true`
  }

  getTexto(key: string): string {
    return this.configService.getTexto(key);
  }
}
