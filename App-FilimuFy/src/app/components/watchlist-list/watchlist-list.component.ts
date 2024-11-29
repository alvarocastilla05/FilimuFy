import { Component } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { TVShow } from '../../interfaces/serie/tv.interface';
import { AccountService } from '../../services/autenticacion/account.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-watchlist-list',
  templateUrl: './watchlist-list.component.html',
  styleUrl: './watchlist-list.component.css'
})
export class WatchlistListComponent {
  
  account_id: number | undefined;
  listaPeliculas: Pelicula[] = [];
  listaSeries: TVShow[] = [];
  currentPage: number = 1; // Página inicial para keyId
  loading: boolean = false; // Estado de carga

  showPeliculas: boolean = true; // Mostrar películas al cargar la página
  showSeries: boolean | undefined; // Mostrar series al cargar la página


  constructor(
    private accountService: AccountService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {

    // Recoge el ID del usuario registrado.
    this.account_id = parseInt(localStorage.getItem('account_id') ?? '0', 10);
    console.log("ID DE CUENTA: "+this.account_id);
    console.log(this.listaPeliculas);

    // Cargar las primeras películas al inicializar el componente
    this.cargarPeliculas();
    this.cargarSeries();
  }
  
  cargarPeliculas(append: boolean = false): void {
    this.loading = true;
    this.accountService.getWatchlistPeli(this.currentPage).subscribe(resp => {
      if (append) {
        this.listaPeliculas = [...this.listaPeliculas, ...resp.results];
      } else {
        this.listaPeliculas = resp.results;
      }
      this.loading = false;
    }, error => {
      console.error('Error al cargar películas favoritas:', error);
      this.loading = false;
    });
  }

  cargarSeries(append: boolean = false): void {
    this.loading = true;
    this.accountService.getWatchlistSerie(this.currentPage).subscribe(resp => {
      if (append) {
        this.listaSeries = [...this.listaSeries, ...resp.results];
      } else {
        this.listaSeries = resp.results;
      }
      this.loading = false;
    }, error => {
      console.error('Error al cargar series favoritas:', error);
      this.loading = false;
    });
  }

    cargarMasPeliculas(): void {
      this.currentPage++; // Incrementar la página
      this.cargarPeliculas(true); // Llamar a la función con `append = true`
    }
  
    cargarMasSeries(): void {
      this.currentPage++; // Incrementar la página
      this.cargarSeries(true); // Llamar a la función con `append = true`
    }

    getTexto(key: string): string {
      return this.configService.getTexto(key);
    }
 
}