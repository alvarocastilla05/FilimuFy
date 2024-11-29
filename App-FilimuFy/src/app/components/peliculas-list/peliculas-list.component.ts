import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { GeneroService } from '../../services/genero.service';
import { Pelicula, PeliculaListResponse } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { Genre } from '../../interfaces/serie/serie-detail.interface';
import { Observable } from 'rxjs';
import { Flatrate } from '../../interfaces/pelicula/proveedorPeli.interfaces';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-peliculas-list',
  templateUrl: './peliculas-list.component.html',
  styleUrls: ['./peliculas-list.component.css']
})
export class PeliculasListComponent implements OnInit, OnChanges {

  listaPeliculas: Pelicula[] = [];
  listaProveedores: Flatrate[] = [];
  currentPage: number = 1; // Página inicial
  loading: boolean = false; // Estado de carga
  listaGeneros: Genre[] = [];
  selectedGenres: number[] = []; // Géneros seleccionados
  selectedProviders: number[] = []; // Proveedores seleccionados

  minVal: number = 0;
  maxVal: number = 10;

  minDur: number = 0;
  maxDur: number = 390;

  @Input() nombre: string | undefined;

  
  

  

  constructor(
    private peliculaService: PeliculaService,
    private generoService: GeneroService,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    // Cargar las primeras películas al inicializar el componente
    this.cargarPeliculas();

    // Cargar los géneros al inicializar el componente
    this.generoService.getGenerosPelicula().subscribe(resp => {
      this.listaGeneros = resp.genres;
    });

    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedorService.getProveedoresPeliculas().subscribe(proveedores => {
      this.listaProveedores = proveedores;
      console.log('Proveedores en España:', this.listaProveedores);
    });
  }

  onProviderChange(event: any): void {
    const providerId = +event.target.value;
    if (event.target.checked) {
      this.selectedProviders.push(providerId);
    } else {
      this.selectedProviders = this.selectedProviders.filter(id => id !== providerId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['nombre']){
      this.listaPeliculas = [];
      this.currentPage = 1;
      this.cargarPeliculas();
    }
  }

cargarPeliculas(genreIds?: number[], providerIds?: number[],  append: boolean = false): void {
  this.loading = true;

  if (!append) {
    this.listaPeliculas = [];
  }

  const hasGenres = genreIds && genreIds.length > 0;
  const hasProviders = providerIds && providerIds.length > 0;

  this.peliculaService.getPelisFiltradas(
    this.currentPage,
    hasGenres ? genreIds : [],
    this.minVal,
    this.maxVal,
    this.minDur,
    this.maxDur,
    hasProviders ? providerIds : []
  ).subscribe((resp: PeliculaListResponse) => {
    this.listaPeliculas = [...this.listaPeliculas, ...resp.results];
    this.loading = false;
  }, error => {
    this.loading = false;
    console.error('Error al cargar las películas:', error);
  }

  )
}

  onGenreChange(event: any): void {
    const genreId = +event.target.value;
    if (event.target.checked) {
      this.selectedGenres.push(genreId);
    } else {
      this.selectedGenres = this.selectedGenres.filter(id => id !== genreId);
    }
  }

  filtrar(): void {
    this.currentPage = 1; // Reiniciar la página al filtrar
    this.cargarPeliculas(this.selectedGenres, this.selectedProviders);
  }

  cargarMasPeliculas(): void {
    this.currentPage++;
    this.cargarPeliculas(this.selectedGenres, this.selectedProviders, true);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

}