import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { AccountService } from '../../services/autenticacion/account.service';
import { TVShow } from '../../interfaces/serie/tv.interface';

@Component({
  selector: 'app-favoritos-list',
  templateUrl: './favoritos-list.component.html',
  styleUrl: './favoritos-list.component.css'
})
export class FavoritosListComponent implements OnInit, OnChanges {

  account_id: number | undefined;
  listaPeliculasFavs: Pelicula[] = [];
  listaSeriesFavs: TVShow[] = [];
  currentPagePeliculas: number = 1; // Página inicial de las pelis
  currentPageSeries: number = 1; // Página inicial de las series
  loading: boolean = false; // Estado de carga

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {

    // Recoge el ID del usuario registrado.
    this.account_id = parseInt(localStorage.getItem('account_id') ?? '0', 10);
    console.log("ID DE CUENTA: "+this.account_id);
    console.log(this.listaPeliculasFavs);

    // Cargar las primeras películas al inicializar el componente
    this.cargarPeliculas();
    //this.cargarSeries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['nombre']){
      this.listaPeliculasFavs = [];
      this.listaSeriesFavs = [];
      this.currentPagePeliculas = 1;
      //this.currentPageSeries = 1;
      this.cargarPeliculas();
      //this.cargarSeries();
    }
  }
  
  cargarPeliculas(append: boolean = false): void {
    this.loading = true;
    this.accountService.getPeliculasFavoritas(this.currentPagePeliculas, this.account_id).subscribe(resp => {
      if (append) {
        this.listaPeliculasFavs = [...this.listaPeliculasFavs, ...resp.results];
      } else {
        this.listaPeliculasFavs = resp.results;
      }
      this.loading = false;
    }, error => {
      console.error('Error al cargar películas favoritas:', error);
      this.loading = false;
    });
  }

  cargarMasPeliculas(): void {
    this.currentPagePeliculas++;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  /*cargarSeries(append: boolean = false): void {
    this.loading = true;
    this.accountService.getSeriesFavoritas(this.currentPageSeries, this.account_id).subscribe(resp => {
      if (append) {
        this.listaSeriesFavs = [...this.listaSeriesFavs, ...resp.results];
      } else {
        this.listaSeriesFavs = resp.results;
      }
      this.loading = false;
    }, error => {
      console.error('Error al cargar series favoritas:', error);
      this.loading = false;
    });
  }*/

  /*cargarMasSeries(): void {
    this.currentPageSeries++;
  }*/
 
}