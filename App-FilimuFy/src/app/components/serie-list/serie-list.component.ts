import { Component, OnInit } from '@angular/core';
import { TVShow } from '../../interfaces/tv.interface';
import { TVShowService } from '../../services/tvshow.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent implements OnInit{

  listaSeries: TVShow[] = [];

  currentPage: number = 1; // Página inicial
  loading: boolean = false; // Estado de carga

  constructor(
    private serieService: TVShowService
  ) { }

  ngOnInit(): void {
    // Cargar las primeras películas al inicializar el componente
    this.cargarSeries();
  }

  cargarSeries(): void {
    if (this.loading) return; // Prevenir solicitudes simultáneas
    this.loading = true;

    this.serieService.getSeries(this.currentPage)
      .subscribe(resp => {
        // Agregar las nuevas películas a la lista existente
        this.listaSeries = [...this.listaSeries, ...resp.results];
        this.currentPage++; // Avanzar a la siguiente página
        this.loading = false; // Terminar el estado de carga
      }, error => {
        console.error('Error al cargar Series:', error);
        this.loading = false; // Manejo del error
      });
  }

 
}
