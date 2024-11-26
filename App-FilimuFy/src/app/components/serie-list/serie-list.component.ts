import { Component, OnInit } from '@angular/core';
import { TVShow } from '../../interfaces/serie/tv.interface';
import { TVShowService } from '../../services/tvshow.service';
import { GeneroService } from '../../services/genero.service';
import { Genre } from '../../interfaces/serie/serie-detail.interface';
import { Flatrate } from '../../interfaces/serie/proveedorSerie.interfaces';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent implements OnInit{

  listaSeries: TVShow[] = [];
  listaProveedores: Flatrate[] = [];
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
    });

    this.cargarTodasLasSeriesYProveedores();
    console.log(this.listaProveedores);
  }


  cargarTodasLasSeriesYProveedores(): void {
    let paginaActual = 1;
    let hasMorePages = true;

    // Lista temporal para almacenar todas las series obtenidas
    const todasLasSeries: TVShow[] = [];

    // Función para iterar por las páginas
    const cargarPagina = (): void => {
      this.serieService.getSeries(paginaActual).subscribe(resp => {
        todasLasSeries.push(...resp.results); // Agregar series de la página actual
        hasMorePages = paginaActual < resp.total_pages; // Verificar si hay más páginas

        if (hasMorePages) {
          paginaActual++;
          cargarPagina(); // Recursivo para la siguiente página
        } else {
          // Cuando se han cargado todas las series, cargamos los proveedores
          this.cargarProveedoresDeSeries(todasLasSeries);
        }
      });
    };

    cargarPagina();
  }

  cargarProveedoresDeSeries(series: TVShow[]): void {
    series.forEach(serie => {
      this.serieService.getProveedoresById(serie.id!).subscribe(respuesta => {
        if (respuesta.results.ES?.flatrate) {
          const nuevosProveedores = respuesta.results.ES.flatrate;
  
          // Añadir solo los proveedores que no estén ya en la lista
          nuevosProveedores.forEach(proveedor => {
            if (!this.listaProveedores.some(p => p.provider_id === proveedor.provider_id)) {
              this.listaProveedores.push(proveedor);
            }
          });
        }
      });
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

        this.cargarProveedores();
      });
    } else {
      this.serieService.getSeries(this.currentPage).subscribe(resp => {
        if (append) {
          this.listaSeries = [...this.listaSeries, ...resp.results];
        } else {
          this.listaSeries = resp.results;
        }
        this.loading = false;

        this.cargarProveedores();
      });
    }
  }

  cargarProveedores(): void {
    this.listaSeries.forEach(serie => {
      this.serieService.getProveedoresById(serie.id!).subscribe(respuesta => {
        if (respuesta.results.ES?.flatrate) {
          this.listaProveedores.push(...respuesta.results.ES.flatrate);
        }
      });
    });
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