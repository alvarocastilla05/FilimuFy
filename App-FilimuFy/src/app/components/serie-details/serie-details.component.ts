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

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrl: './serie-details.component.css'
})
export class SerieDetailsComponent implements OnInit{

  estadoFav: boolean = false;
  estadoWatchlist: boolean = false;

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serieId = this.route.snapshot.paramMap.get('id');

    this.serieService.getSerieById(parseInt(this.serieId!)).subscribe((response) => {
      this.serie = response;

    });

    this.serieService.getVideoSerieById(this.serieId!).subscribe(respuesta => {
      this.video = respuesta;  
      this.videos = respuesta.results;  

      const trailer = this.videos.find(video => video.type === 'Trailer');
      if (trailer) {
        this.seleccionarVideo(trailer);
      }
    });

    this.serieService.getCreditosSerieById(parseInt(this.serieId!)).subscribe(respuesta => {
      this.credito = respuesta;
      this.listaCreditos = respuesta.cast;
    });

    this.serieService.getCertificationById(parseInt(this.serieId!)).subscribe(resp => {
      this.paisesList = resp.results;
    });

    this.serieService.getProveedoresById(parseInt(this.serieId!)).subscribe(resp => {
      this.regionList = resp.results;
    });

    this.serieService.getKeywordsById(parseInt(this.serieId!)).subscribe(respuesta => {
      this.keywords = respuesta.results;
    });

    this.serieService.getProveedoresById(parseInt(this.serieId!)).subscribe(respuesta => {
      this.listaProveedores = respuesta.results.ES.flatrate;
    });

    this.checkFavorito(parseInt(this.serieId!));
    this.checkWatchlist(parseInt(this.serieId!));

    
  }

  seleccionarVideo(video: VideoSerie) {
    this.selectedVideo = video;
  }

  getCertification() {
    let esp;

    if (this.paisesList.find(pais => pais.iso_3166_1 === 'ES')) {
      esp = this.paisesList.find(pais => pais.iso_3166_1 === 'ES');
      return '+'+esp!.rating;
    } else {
      return 'N/A';
    }
  }

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }



  // BOTÓN FAVORITOS ------------------------------------------------------------------------------------------------------------------------

  checkFavorito(serieId: number): void {
    this.accountService.getFavoritosSerie().subscribe(response => {
      const favoritos = response.results;
      this.estadoFav = favoritos.some(serie => serie.id === serieId);
    });
  }

  async addOrRemoveFavoritos(serieId: number): Promise<any> {
    const urlAddFavoritos = this.accountService.getUrlAddFavoritos();
    const data = {
      media_type: "tv",  // Cambiar a "movie" si es una peli
      media_id: serieId,
      favorite: this.estadoFav, // true para añadir, false para quitar
    };
  
    try {
      const response = await fetch(urlAddFavoritos, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al añadir/quitar favorito: ${response.status} - ${errorMessage}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en la operación de favorito:', error);
      throw error;
    }
  }

  onFavoritosBotonClick(serieId: number): void {
    this.toggleFavoritos(serieId);
  }

  toggleFavoritos(serieId: number): void {
    this.estadoFav = !this.estadoFav;
    this.addOrRemoveFavoritos(serieId).then(result => {
      console.log('Estado de favoritos actualizado:', result);
    }).catch(error => {
      console.error('Error al actualizar favoritos:', error);
    });
  }

  //Boton Watchlist ------------------------------------------------------------------------------------------------------------------------

  checkWatchlist(serieId: number): void {
    this.accountService.getWatchlistSerie().subscribe(response => {
      const watchlist = response.results;
      this.estadoWatchlist = watchlist.some(serie => serie.id === serieId);
    });
  }

  async addOrRemoveWatchlist(serieId: number): Promise<any> {
    const urlAddWatchlist = this.accountService.getUrlAddWatchlist();
    const data = {
      media_type: "tv",  // Cambiar a "movie" si es una peli
      media_id: serieId,
      watchlist: this.estadoWatchlist, // true para añadir, false para quitar
    };
  
    try {
      const response = await fetch(urlAddWatchlist, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al añadir/quitar watchlist: ${response.status} - ${errorMessage}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en la operación de watchlist:', error);
      throw error;
    }
  }

  onWatchlistBotonClick(serieId: number): void {
    this.toggleWatchlist(serieId);
  }

  toggleWatchlist(serieId: number): void {
    this.estadoWatchlist = !this.estadoWatchlist;
    this.addOrRemoveWatchlist(serieId).then(result => {
      console.log('Estado de watchlist actualizado:', result);
    }).catch(error => {
      console.error('Error al actualizar watchlist:', error);
    });
  }
}
