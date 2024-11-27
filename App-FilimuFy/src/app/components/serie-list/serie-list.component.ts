import { Component, OnInit } from '@angular/core';
import { TVShow } from '../../interfaces/serie/tv.interface';
import { TVShowService } from '../../services/tvshow.service';
import { GeneroService } from '../../services/genero.service';
import { Genre } from '../../interfaces/serie/serie-detail.interface';
import { Flatrate } from '../../interfaces/serie/proveedorSerie.interfaces';
import { forkJoin } from 'rxjs';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent implements OnInit {
  listaSeries: TVShow[] = [];
  todasLasSeries: TVShow[] = [];
  listaProveedores: Flatrate[] = [];
  currentPage: number = 1;
  paginaParaProveedores: number = 1;
  loading: boolean = false;
  listaGeneros: Genre[] = [];
  selectedGenres: number[] = [];
  selectedProviders: number[] = [];

  constructor(
    private serieService: TVShowService,
    private generoService: GeneroService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    console.log('Inicializando componente SerieListComponent...');
    this.cargarSeries();
    this.generoService.getGenerosSerie().subscribe(resp => {
      this.listaGeneros = resp.genres;
      console.log('Lista de géneros cargada:', this.listaGeneros);
    });
    /*
    this.cargarTodasLasSeries();
    this.cargarProveedoresDeTodasLasSeries(this.todasLasSeries);
    */
    this.cargarProveedores();
    console.log('Lista de proveedores cargada:', this.listaProveedores);
  }

  cargarProveedores() {
    this.proveedorService.getProveedoresSeries().subscribe(proveedores => {
      this.listaProveedores = proveedores;
      console.log('Proveedores en España:', this.listaProveedores);
    });
  }

  onProviderChange(event: any): void {
    const providerId = +event.target.value; // Convierte el ID del proveedor a número
    if (event.target.checked) {
      this.selectedProviders.push(providerId); // Añade el ID del proveedor seleccionado
    } else {
      // Elimina el proveedor de la lista si se desmarca
      this.selectedProviders = this.selectedProviders.filter(id => id !== providerId);
    }
    console.log('Proveedores seleccionados:', this.selectedProviders);
  }
  
  
  filtrarPorProveedores(): void {
    this.currentPage = 1; // Reinicia la paginación
    this.cargarSeriesPorProveedores();
  }
  
  cargarSeriesPorProveedores(): void {
    if (this.selectedProviders.length === 0) {
      console.log('No hay proveedores seleccionados');
      return;
    }
  
    this.loading = true;
  
    this.serieService.getSeriesPorProveedores(this.currentPage, this.selectedProviders).subscribe(resp => {
      this.listaSeries = resp.results;
      this.loading = false;
      console.log('Series filtradas por proveedores:', this.listaSeries);
    });
  }
  

  
  /*
  cargarTodasLasSeries(append: boolean = false): void {
    this.loading = true;
    let paginaActual = this.paginaParaProveedores;

    const cargarPagina = (): void => {
      this.serieService.getSeries(paginaActual).subscribe(
        resp => {
          if (append || this.todasLasSeries.length > 0) {
            this.todasLasSeries = [...this.todasLasSeries, ...resp.results];
          } else {
            this.todasLasSeries = resp.results;
          }
          console.log(`Series de la página ${paginaActual}:`, resp.results);

          if (paginaActual < 40) {
            paginaActual++;
            cargarPagina();
          } else {
            this.loading = false;
            console.log('Se han cargado todas las series:', this.todasLasSeries);
            this.cargarProveedoresDeTodasLasSeries(this.todasLasSeries);
          }
        },
        error => {
          console.error('Error al cargar las series:', error);
          this.loading = false;
        }
      );
    };

    cargarPagina();
  }

  cargarProveedoresDeTodasLasSeries(series: TVShow[]): void {
    const peticiones = series.map(serie =>
      this.serieService.getProveedoresById(serie.id!) // Observable para obtener los proveedores por serie
    );
  
    forkJoin(peticiones).subscribe(respuestas => {
      const proveedoresUnicos = new Map<number, Flatrate>();
  
      respuestas.forEach(respuesta => {
        if (respuesta.results.ES?.flatrate) {
          respuesta.results.ES.flatrate.forEach(proveedor => {
            if (!proveedoresUnicos.has(proveedor.provider_id)) {
              proveedoresUnicos.set(proveedor.provider_id, proveedor);
            }
          });
        }
      });
  
      // Convertimos el Map a un array y lo asignamos a listaProveedores
      this.listaProveedores = Array.from(proveedoresUnicos.values());
  
      console.log('Todos los proveedores únicos:', this.listaProveedores);
    }, error => {
      console.error('Error al cargar los proveedores:', error);
    });
  }
  */
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
        //this.cargarProveedoresDeTodasLasSeries(this.todasLasSeries);
        console.log('Lista de series filtrada por género:', this.listaSeries);
      });
    } else {
      this.serieService.getSeries(this.currentPage).subscribe(resp => {
        if (append) {
          this.listaSeries = [...this.listaSeries, ...resp.results];
        } else {
          this.listaSeries = resp.results;
        }
        this.loading = false;
        //this.cargarProveedoresDeTodasLasSeries(this.todasLasSeries);
        console.log('Lista de series:', this.listaSeries);
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
    this.currentPage = 1;
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
