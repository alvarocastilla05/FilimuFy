import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';
import { TVShowService } from '../../services/tvshow.service';
import { Pelicula } from '../../interfaces/pelicula-list.interfaces';
import { TVShow } from '../../interfaces/tv.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  listaPeliculas: Pelicula[] = [];
  listaSeries: TVShow[] = [];

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private serieService: TVShowService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'];

      if (this.query) {
        // Buscar películas
        this.peliculaService.searchPeliculas(this.query).subscribe((resp) => {
          this.listaPeliculas = resp.results;
        });

        // Buscar series
        this.serieService.searchSeries(this.query).subscribe((resp) => {
          this.listaSeries = resp.results;
        });
      }
    });
  }
}
