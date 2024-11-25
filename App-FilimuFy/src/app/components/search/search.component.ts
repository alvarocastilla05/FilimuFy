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

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private serieService: TVShowService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'];
      this.keyId = +params['keyId']; // Convertir a número

      if (this.query) {
        // Buscar películas
        this.peliculaService.searchPeliculas(this.query).subscribe((resp) => {
          this.listaPeliculas = resp.results;
        });

        // Buscar series
        this.serieService.searchSeries(this.query).subscribe((resp) => {
          this.listaSeries = resp.results;
        });
      } else if (this.keyId) {
        this.peliculaService.getPeliculasPorPalabraClave(this.keyId).subscribe((resp) => {
          this.listaPeliculas = resp.results;
        });
      }
    });
  }
}