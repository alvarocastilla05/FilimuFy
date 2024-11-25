import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';
import { TVShowService } from '../../services/tvshow.service';
import { Pelicula } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { TVShow } from '../../interfaces/serie/tv.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  listaPeliculas: Pelicula[] = [];
  listaSeries: TVShow[] = [];
  keyId: number | undefined;

  currentPage: number = 1; // Página inicial para keyId
  loading: boolean = false; // Estado de carga

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private serieService: TVShowService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'];
      this.keyId = +params['keyId']; // Convertir a número
      this.currentPage = 1; // Reiniciar la página al cambiar los parámetros
      this.listaPeliculas = []; // Reiniciar lista de películas

      if (this.query) {
        // Buscar películas y series
        this.buscarPeliculas();
        this.buscarSeries();
      }

      if (this.keyId) {
        // Filtrar películas por keyId
        this.filtrarPeliculasPorKeyId();
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
      },
      (error) => {
        console.error('Error al filtrar películas:', error);
        this.loading = false; // Manejar error
      }
    );
  }

  cargarMasPeliculasFiltradas(): void {
    this.currentPage++; // Incrementar la página
    this.filtrarPeliculasPorKeyId(true); // Llamar a la función con `append = true`
  }
}
