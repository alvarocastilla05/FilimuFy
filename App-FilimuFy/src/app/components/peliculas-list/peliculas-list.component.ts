import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { GeneroService } from '../../services/genero.service';
import { Pelicula } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { Genre } from '../../interfaces/serie/serie-detail.interface';

@Component({
  selector: 'app-peliculas-list',
  templateUrl: './peliculas-list.component.html',
  styleUrls: ['./peliculas-list.component.css']
})
export class PeliculasListComponent implements OnInit, OnChanges {

  listaPeliculas: Pelicula[] = [];
  currentPage: number = 1; // Página inicial
  loading: boolean = false; // Estado de carga
  
  @Input() nombre: string | undefined;

  listaGeneros: Genre[] = [];
  selectedGenres: number[] = []; // Géneros seleccionados

  constructor(
    private peliculaService: PeliculaService,
    private generoService: GeneroService
  ) { }

  ngOnInit(): void {
    // Cargar las primeras películas al inicializar el componente
    this.cargarPeliculas();

    // Cargar los géneros al inicializar el componente
    this.generoService.getGenerosPelicula().subscribe(resp => {
      this.listaGeneros = resp.genres;
    }, error => {
      console.error('Error al cargar géneros:', error);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['nombre']){
      this.listaPeliculas = [];
      this.currentPage = 1;
      this.cargarPeliculas();
    }
  }

  /*cargarPeliculas(): void {
    if (this.loading) return; // Prevenir solicitudes simultáneas
    this.loading = true;
  }
  /*ngOnChanges(): void {
    // Recargar las películas cuando haya cambios
    this.cargarPeliculas();
  }*/

  cargarPeliculas(genreIds?: number[], append: boolean = false): void {
    this.loading = true;
    if (genreIds && genreIds.length > 0) {
      this.peliculaService.getPeliculasPorGenero(this.currentPage, genreIds).subscribe(resp => {
        if (append) {
          this.listaPeliculas = [...this.listaPeliculas, ...resp.results];
        } else {
          this.listaPeliculas = resp.results;
        }
        this.loading = false;
      }, error => {
        console.error('Error al cargar películas:', error);
        this.loading = false;
      });
    } else {
      this.peliculaService.getPeliculas(this.currentPage).subscribe(resp => {
        if (append) {
          this.listaPeliculas = [...this.listaPeliculas, ...resp.results];
        } else {
          this.listaPeliculas = resp.results;
        }
        this.loading = false;
      }, error => {
        console.error('Error al cargar películas:', error);
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
    this.cargarPeliculas(this.selectedGenres);
  }

  cargarMasPeliculas(): void {
    this.currentPage++;
    this.cargarPeliculas(this.selectedGenres, true);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}