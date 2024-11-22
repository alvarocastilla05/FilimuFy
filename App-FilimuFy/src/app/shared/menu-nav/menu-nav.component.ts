import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/autenticacion/auth.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { PeliculaService } from '../../services/pelicula.service';
import { TVShowService } from '../../services/tvshow.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent implements OnInit{

  // HEADER 
  logoFilimuFy = 'https://cdn-icons-png.flaticon.com/512/4221/4221360.png';
  rutaActual: string = "";
  userName = '';
  userPhoto = '';
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  nombre: string | undefined

  @Output() nombreSeleccionado = new EventEmitter<string>();

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private peliculaService: PeliculaService,
    private serieService: TVShowService,
  ) { }

  

  ngOnInit(): void {

    this.peliculaService.getPeliculas().subscribe((response) => {
      response.results.forEach((movie) => {
        this.options.push(movie.title);
      });
    });
    this.serieService.getSeries().subscribe((response) => {
      response.results.forEach((serie) => {
        this.options.push(serie.name);
      });
    });


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.rutaActual = this.router.url;
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo') ?? '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  //Filtrar por nombre de pelicula o serie
  filtrarPorNombre() {
    if(this.nombre){
      this.nombreSeleccionado.emit(this.nombre);
    }else{
      alert('Nombre no encontrado')
    }
  }

  getRutaSeleccionada(pagina: string) {
    let rutaActual = this.router.url;

    if(rutaActual.includes(pagina)) {
      return true;
    } else {
      return false;
    }
  }


  // AUTENTICACIÓN -----------------------------------------------------------------------------------

  createRequestToken() {
    this.authService.createRequestToken().subscribe((response) => {
      localStorage.setItem('token', response.request_token);

      // STEP 2 de la autenticación en TMDB (firma del token iniciando sesión en TMDB)
      window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=http://localhost:4200/approved`;
    });
  }

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }

  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200';
  }

}