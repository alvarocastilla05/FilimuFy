import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDetailResponse } from '../../interfaces/pelicula/pelicula-detail.interfaces';
import { Cast, CreditosListResponse } from '../../interfaces/otros/credito.interfaces';
import { Video, VIdeoListResponse } from '../../interfaces/pelicula/videoPelis.interfaces';
import { Buy, Flatrate } from '../../interfaces/pelicula/proveedorPeli.interfaces';
import { Region } from '../../interfaces/pelicula/releaseDateCertifications.interfaces';
import { Keyword } from '../../interfaces/pelicula/pelicula-keywords.interfaces';
import { RatedPelicula } from '../../interfaces/pelicula/rated-peliculas.interfaces';
import { AccountService } from '../../services/autenticacion/account.service';
import { ListasService } from '../../services/listas.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-pelicula-details',
  templateUrl: './pelicula-details.component.html',
  styleUrls: ['./pelicula-details.component.css']
})
export class PeliculaDetailsComponent implements OnInit {

  // Estados visuales
  estadoFav: boolean = false;
  estadoWatchlist: boolean = false;
  rating: number = 0;

  peliculaId: string | null = '';
  pelicula: PeliculaDetailResponse | undefined;
  credito: CreditosListResponse | undefined;
  listaCreditos: Cast[] = [];
  video: VIdeoListResponse | undefined;
  videos: Video[] = [];
  selectedVideo: Video | undefined;
  listaProveedores: Flatrate[] = [];
  listaProveedoresPago: Buy[] = [];
  regionList: Region[] = [];
  certificationEsp: Region | undefined;
  keywords: Keyword[] = [];
  
  placeholderFoto = 'https://png.pngtree.com/png-vector/20220618/ourmid/pngtree-default-photo-placeholder-account-anonymous-png-image_5130471.png';
  imgPlaceholderPelSer = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/800px-No-Image-Placeholder.svg.png';
  
  listas: any[] = [];
  alertMessages: Array<{ type: string, message: string }> = [];

  @Output() estadoFavRecarga = new EventEmitter<boolean>();

  constructor(
    private peliculaService: PeliculaService,
    private accountService: AccountService,
    private listasService: ListasService,
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.peliculaId = this.route.snapshot.paramMap.get('id');

    if (this.peliculaId) {
      const peliculaIdNum = parseInt(this.peliculaId);

      // 1. Cargar datos básicos de la película
      this.peliculaService.getPeliculaById(peliculaIdNum).subscribe(respuesta => {
        this.pelicula = respuesta;
      });

      this.peliculaService.getCreditosById(peliculaIdNum).subscribe(respuesta => {
        this.credito = respuesta;
        this.listaCreditos = respuesta.cast;
      });

      this.peliculaService.getKeywordsById(peliculaIdNum).subscribe(respuesta => {
        this.keywords = respuesta.keywords;
      });

      this.peliculaService.getVideoById(this.peliculaId).subscribe(respuesta => {
        this.video = respuesta;
        this.videos = respuesta.results;
        const trailer = this.videos.find(video => video.type === 'Trailer');
        if (trailer) {
          this.seleccionarVideo(trailer);
        }
      });

      this.peliculaService.getProveedoresById(peliculaIdNum).subscribe(respuesta => {
        this.listaProveedores = respuesta.results.ES?.flatrate || [];
        this.listaProveedoresPago = respuesta.results.ES?.buy || [];
      });

      // 2. MAGIA AQUÍ: Comprobar el estado del usuario (Favorito, Watchlist, Rating)
      // Solo si está logueado
      if (this.isLoggedIn()) {
        this.checkAccountStates(peliculaIdNum);
      }
    }

    // Cargar listas del usuario si está logueado
    if (this.isLoggedIn()) {
      this.cargarListasUsuario();
    }
  }

  // --- NUEVO MÉTODO UNIFICADO: Comprueba todo de una vez ---
  checkAccountStates(id: number) {
    this.accountService.getMovieAccountStates(id).subscribe({
      next: (states) => {
        // 1. ¿Es Favorito?
        this.estadoFav = states.favorite;
        
        // 2. ¿Está en Watchlist?
        this.estadoWatchlist = states.watchlist;
        
        // 3. ¿Tiene nota?
        if (states.rated) {
          this.rating = states.rated.value;
        } else {
          this.rating = 0;
        }
      },
      error: (err) => console.error('Error obteniendo estados:', err)
    });
  }

  // --- ACCIONES DE USUARIO (USANDO EL NUEVO SERVICIO) ---

  onFavoritosBotonClick(peliculaId: number): void {
    // Cambio optimista (visual inmediato)
    this.estadoFav = !this.estadoFav;

    this.accountService.markAsFavorite(peliculaId, 'movie', this.estadoFav).subscribe({
      next: (res) => {
        console.log('Favorito actualizado', res);
        // Opcional: Emitir evento si necesitas recargar algo fuera
        this.estadoFavRecarga.emit(this.estadoFav); 
      },
      error: (err) => {
        console.error('Error al marcar favorito', err);
        // Revertir cambio visual si falla
        this.estadoFav = !this.estadoFav;
        this.mostrarAlerta('danger', 'Error al actualizar favoritos');
      }
    });
  }

  onWatchlistBotonClick(peliculaId: number): void {
    // Cambio optimista
    this.estadoWatchlist = !this.estadoWatchlist;

    this.accountService.addToWatchlist(peliculaId, 'movie', this.estadoWatchlist).subscribe({
      next: (res) => {
        console.log('Watchlist actualizada', res);
      },
      error: (err) => {
        console.error('Error al actualizar watchlist', err);
        // Revertir cambio
        this.estadoWatchlist = !this.estadoWatchlist;
        this.mostrarAlerta('danger', 'Error al actualizar watchlist');
      }
    });
  }

  setRating(rating: number) {
    this.rating = rating; // Actualizar visualmente
    const idNum = parseInt(this.peliculaId!);
    
    this.accountService.rateMovie(idNum, rating).subscribe({
      next: (res) => console.log('Valoración enviada', res),
      error: (err) => {
        console.error('Error al valorar', err);
        this.mostrarAlerta('danger', 'Error al enviar valoración');
      }
    });
  }

  deleteRating() {
    this.rating = 0;
    const idNum = parseInt(this.peliculaId!);

    this.accountService.deleteRating(idNum, 'movie').subscribe({
      next: (res) => console.log('Valoración eliminada', res),
      error: (err) => console.error('Error al borrar valoración', err)
    });
  }

  // --- RESTO DE FUNCIONALIDADES (Listas, Videos, etc.) ---

  seleccionarVideo(video: Video) {
    this.selectedVideo = video;
  }

  cargarListasUsuario(): void {
    this.listasService.getListas().subscribe({
      next: (response) => {
        this.listas = response.results || [];
      },
      error: (error) => console.error('Error al cargar listas:', error)
    });
  }

  agregarPeliculaALista(listaId: string): void {
    if (!this.peliculaId) return;

    this.listasService.agregarPeliculaALista(listaId, parseInt(this.peliculaId)).subscribe({
      next: (response) => {
        this.mostrarAlerta('success', '"' + this.pelicula!.title + '"' + this.getTexto('addPeliToList'));
      },
      error: (error) => {
        console.error('Error al añadir película a la lista:', error);
        this.mostrarAlerta('danger', '"' + this.pelicula!.title + '"' + this.getTexto('addPeliToListAgain'));
      }
    });
  }

  // --- UTILIDADES ---

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }

  getTexto(key: string): string {
    return this.configService.getTexto(key);
  }

  mostrarAlerta(type: string, message: string): void {
    this.alertMessages.push({ type, message });
    setTimeout(() => {
      this.alertMessages.shift();
    }, 4000);
  }

  close(alert: any): void {
    const index = this.alertMessages.indexOf(alert);
    if (index !== -1) {
      this.alertMessages.splice(index, 1);
    }
  }

  getCertification() {
    let certificacion = "N/A";
    const region = this.regionList.find(region => region.iso_3166_1 === 'ES' || region.iso_3166_1 === 'GB');
    if (region && region.release_dates && region.release_dates.length > 0) {
      const cert = region.release_dates[0].certification;
      if (cert === "A") {
        certificacion = cert;
      } else {
        certificacion = cert === "" ? "N/A" : "+" + cert;
      }
    }
    return certificacion;
  }
}