import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-peliculas-list',
  templateUrl: './peliculas-list.component.html',
  styleUrl: './peliculas-list.component.css'
})
export class PeliculasListComponent implements OnInit{

  listaPeliculas: Pelicula[] = [];
  currentPage: number = 1; // Página inicial
  loading: boolean = false; // Estado de carga

  constructor(
    private peliculaService: PeliculaService
  ) { }

  ngOnInit(): void {
    // Cargar las primeras películas al inicializar el componente
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    if (this.loading) return; // Prevenir solicitudes simultáneas
    this.loading = true;

    this.peliculaService.getPeliculas(this.currentPage)
      .subscribe(resp => {
        // Agregar las nuevas películas a la lista existente
        this.listaPeliculas = [...this.listaPeliculas, ...resp.results];
        this.currentPage++; // Avanzar a la siguiente página
        this.loading = false; // Terminar el estado de carga
      }, error => {
        console.error('Error al cargar películas:', error);
        this.loading = false; // Manejo del error
      });
  }

 
}
