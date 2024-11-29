import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/autenticacion/auth.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { PeliculaService } from '../../services/pelicula.service';
import { TVShowService } from '../../services/tvshow.service';
import { Pelicula } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { TVShow } from '../../interfaces/serie/tv.interface';
import { ConfigService } from '../../services/config.service';
import { MatSelectChange } from '@angular/material/select';

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
  nombre: string | undefined;
  pelisPorNombre: Pelicula[] = [];
  seriesPorNombre: TVShow[] = [];

  selectedLanguageAndRegion = 'es-ES,ES';


  @Output() nombreSeleccionado = new EventEmitter<string>();

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private peliculaService: PeliculaService,
    private serieService: TVShowService,
    private configService: ConfigService
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

    const language = localStorage.getItem('language') || 'es-ES';
    const region = localStorage.getItem('region') || 'ES';
    this.selectedLanguageAndRegion = `${language},${region}`;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();


    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  filtrarPorNombre() {
    if (this.nombre) {
      // Filtrar películas por nombre
      this.peliculaService.searchPeliculas(this.nombre).subscribe((response) => {
        this.pelisPorNombre = response.results;
      });

      // Filtrar series por nombre
      this.serieService.searchSeries(this.nombre).subscribe((response) => {
        this.seriesPorNombre = response.results;
      });

      // Navegar al componente de búsqueda con resultados
      this.router.navigate(['/search'], {
        queryParams: { query: this.nombre },
      });
    } else {
      alert('Por favor, ingresa un término de búsqueda.');
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

  changeLanguageAndRegion(event: MatSelectChange): void {
    const [language, region] = event.value.split(',');

    // Guardar los valores seleccionados en el localStorage
    localStorage.setItem('language', language);
    localStorage.setItem('region', region);

    // Actualizar la configuración global a través del servicio
    this.configService.setLanguage(language);
    this.configService.setWatchRegion(region);
    this.selectedLanguageAndRegion = this.configService.getLanguage() + ',' + this.configService.getWatchRegion();

    // Recargar la página para aplicar los cambios
    window.location.reload();
  }

  getTexto(key: string): string {
    return this.configService.getTexto(key);
  }


  getSelectedLanguageFlag(): string {
    const language = this.selectedLanguageAndRegion?.split(',')[1];
    switch (language) {
      case 'ES':
        return '/img/es.svg';
      case 'GB':
        return '/img/sh.svg';
      default:
        return ''; // O una imagen predeterminada
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