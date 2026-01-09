import { Component, OnInit } from '@angular/core';
import { SerieDetailResponse } from '../../interfaces/serie/serie-detail.interface';
import { TVShowService } from '../../services/tvshow.service';
import { ActivatedRoute } from '@angular/router';
import { VideoSerie, VideoSerieListResponse } from '../../interfaces/serie/videoSeries.interfaces';
import { Cast, CreditosListResponse } from '../../interfaces/otros/credito.interfaces';
import { Pais } from '../../interfaces/serie/contentRatingsCertifications.interfaces';
import { Region } from '../../interfaces/serie/proveedorSerie.interfaces';
import { Keyword } from '../../interfaces/serie/serie-keywords.interfaces';
import { Buy, Flatrate } from '../../interfaces/pelicula/proveedorPeli.interfaces';
import { AccountService } from '../../services/autenticacion/account.service';
import { Ad8 } from '../../interfaces/serie/proveedorSerieAds.interfaces';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrl: './serie-details.component.css'
})
export class SerieDetailsComponent implements OnInit {

  // Estados visuales del usuario
  estadoFav: boolean = false;
  estadoWatchlist: boolean = false;
  rating: number = 0;

  regionAdsList: Ad8[] = [];
  serieId: string | null = '';
  serie: SerieDetailResponse | undefined;
  video: VideoSerieListResponse | undefined;
  videos: VideoSerie[] = [];
  selectedVideo: VideoSerie | undefined;
  certificationEsp: Region | undefined;
  credito: CreditosListResponse | undefined;
  listaCreditos: Cast[] = [];
  paisesList: Pais[] = [];
  regionList: Region | undefined;
  keywords: Keyword[] = [];
  listaProveedores: Flatrate[] = [];
  listaProveedoresPago: Buy[] = [];
  
  placeholderFoto = 'https://png.pngtree.com/png-vector/20220618/ourmid/pngtree-default-photo-placeholder-account-anonymous-png-image_5130471.png';
  imgPlaceholderPelSer = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/800px-No-Image-Placeholder.svg.png';

  constructor(
    private serieService: TVShowService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.serieId = this.route.snapshot.paramMap.get('id');

    if (this.serieId) {
      const serieIdNum = parseInt(this.serieId);

      // 1. Carga de datos de la serie (Sin cambios)
      this.serieService.getSerieById(serieIdNum).subscribe((response) => {
        this.serie = response;
      });

      this.serieService.getVideoSerieById(this.serieId).subscribe(respuesta => {
        this.video = respuesta;
        this.videos = respuesta.results;
        const trailer = this.videos.find(video => video.type === 'Trailer');
        if (trailer) {
          this.seleccionarVideo(trailer);
        }
      });

      this.serieService.getCreditosSerieById(serieIdNum).subscribe(respuesta => {
        this.credito = respuesta;
        this.listaCreditos = respuesta.cast;
      });

      this.serieService.getCertificationById(serieIdNum).subscribe(resp => {
        this.paisesList = resp.results;
      });

      this.serieService.getProveedoresById(serieIdNum).subscribe(resp => {
        this.regionList = resp.results;
        // Proveedores streaming españa
        this.listaProveedores = resp.results.ES?.flatrate || [];
      });

      this.serieService.getKeywordsById(serieIdNum).subscribe(respuesta => {
        this.keywords = respuesta.results;
      });

      this.serieService.getProveedoresAdsById(serieIdNum).subscribe(resp => {
        this.regionAdsList = resp.results.ES?.ads || [];
      });

      // 2. MAGIA AQUÍ: Comprobar estado del usuario con la serie
      if (this.isLoggedIn()) {
        this.checkAccountStates(serieIdNum);
      }
    }
  }

  // --- NUEVO MÉTODO UNIFICADO: Comprueba todo de una vez ---
  checkAccountStates(id: number) {
    this.accountService.getTVAccountStates(id).subscribe({
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
      error: (err) => console.error('Error obteniendo estados de la serie:', err)
    });
  }

  // --- ACCIONES DE USUARIO (USANDO EL NUEVO SERVICIO) ---

  onFavoritosBotonClick(serieId: number): void {
    // Cambio visual optimista
    this.estadoFav = !this.estadoFav;

    // Enviamos 'tv' como tipo
    this.accountService.markAsFavorite(serieId, 'tv', this.estadoFav).subscribe({
      next: (res) => console.log('Favorito actualizado', res),
      error: (err) => {
        console.error('Error al marcar favorito', err);
        // Revertir si falla
        this.estadoFav = !this.estadoFav;
      }
    });
  }

  onWatchlistBotonClick(serieId: number): void {
    // Cambio visual optimista
    this.estadoWatchlist = !this.estadoWatchlist;

    this.accountService.addToWatchlist(serieId, 'tv', this.estadoWatchlist).subscribe({
      next: (res) => console.log('Watchlist actualizada', res),
      error: (err) => {
        console.error('Error al actualizar watchlist', err);
        this.estadoWatchlist = !this.estadoWatchlist;
      }
    });
  }

  setRating(rating: number) {
    this.rating = rating;
    const idNum = parseInt(this.serieId!);
    
    // Usamos rateTVShow
    this.accountService.rateTVShow(idNum, rating).subscribe({
      next: (res) => console.log('Valoración serie enviada', res),
      error: (err) => console.error('Error al valorar serie', err)
    });
  }

  deleteRating() {
    this.rating = 0;
    const idNum = parseInt(this.serieId!);

    this.accountService.deleteRating(idNum, 'tv').subscribe({
      next: (res) => console.log('Valoración eliminada', res),
      error: (err) => console.error('Error al borrar valoración', err)
    });
  }

  // --- UTILIDADES ---

  seleccionarVideo(video: VideoSerie) {
    this.selectedVideo = video;
  }

  getCertification() {
    let esp;
    if (this.paisesList.find(pais => pais.iso_3166_1 === 'ES')) {
      esp = this.paisesList.find(pais => pais.iso_3166_1 === 'ES');
      return '+' + esp!.rating;
    } else {
      return 'N/A';
    }
  }

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }

  getTexto(key: string): string {
    return this.configService.getTexto(key);
  }
}