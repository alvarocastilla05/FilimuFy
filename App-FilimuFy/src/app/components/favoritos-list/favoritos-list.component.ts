import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { AccountService } from '../../services/autenticacion/account.service';
import { TVShow } from '../../interfaces/serie/tv.interface';

@Component({
  selector: 'app-favoritos-list',
  templateUrl: './favoritos-list.component.html',
  styleUrl: './favoritos-list.component.css'
})
export class FavoritosListComponent implements OnInit {

  account_id: number | undefined;
  listaPeliculas: Pelicula[] = [];
  listaSeries: TVShow[] = [];
  currentPage: number = 1; // Página inicial para keyId
  loading: boolean = false; // Estado de carga

  showPeliculas: boolean = true; // Mostrar películas al cargar la página
  showSeries: boolean | undefined; // Mostrar series al cargar la página


  constructor(
    private accountService: AccountService,
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
    this.accountService.getPeliculasFavoritas(this.currentPage).subscribe(resp => {
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
    this.accountService.getSeriesFavoritas(this.currentPage).subscribe(resp => {
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
 
}