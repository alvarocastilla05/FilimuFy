import { Component, OnInit } from '@angular/core';
import { TVShow } from '../../interfaces/tv.interface';
import { TVShowService } from '../../services/tvshow.service';
import { Genre } from '../../interfaces/serie-detail.interface';
import { GeneroService } from '../../services/genero.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent implements OnInit{

  listaSeries: TVShow[] = [];
  currentPage: number = 1; // Página inicial
  loading: boolean = false; // Estado de carga
  listaGeneros: Genre[] = [];
  selectedGenres: number[] = []; // Géneros seleccionados

  constructor(
    private serieService: TVShowService,
    private generoService: GeneroService
  ) { }

  ngOnInit(): void {
    // Cargar las primeras películas al inicializar el componente
    this.cargarSeries();

    // Cargar los géneros al inicializar el componente
    this.generoService.getGenerosSerie().subscribe(resp => {
      this.listaGeneros = resp.genres;
    }, error => {
      console.error('Error al cargar géneros:', error);
    });
  }

  ngOnChanges(): void {
    // Recargar las películas cuando haya cambios
    this.cargarSeries();
  }

  cargarSeries(genreIds?: number[], append: boolean = false): void {
    this.loading = true;
    if (genreIds && genreIds.length > 0) {
      this.serieService.getSeriesPorGenero(this.currentPage, genreIds).subscribe(resp => {
        if (append) {
          this.listaSeries = [...this.listaSeries, ...resp.results];
        } else {
          this.listaSeries = resp.results;
        }
        this.loading = false;
      }, error => {
        console.error('Error al cargar series:', error);
        this.loading = false;
      });
    } else {
      this.serieService.getSeries(this.currentPage).subscribe(resp => {
        if (append) {
          this.listaSeries = [...this.listaSeries, ...resp.results];
        } else {
          this.listaSeries = resp.results;
        }
        this.loading = false;
      }, error => {
        console.error('Error al cargar series:', error);
        this.loading = false;
      });
    }
  }

  onGenreChange(event: any): void {
    const genreId = +event.target.value;
    if (event.target.checked) {
      this.selectedGenres.push(genreId);
    } else {
      this.selectedGenres = this.selectedGenres.filter(id => id !== genreId);
    }
  }

  filtrarPorGenero(): void {
    this.currentPage = 1; // Reiniciar la página al filtrar
    this.cargarSeries(this.selectedGenres);
  }

  cargarMasSeries(): void {
    this.currentPage++;
    this.cargarSeries(this.selectedGenres, true);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}