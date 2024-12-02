import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDetailResponse } from '../../interfaces/pelicula/pelicula-detail.interfaces';
import { Cast, CreditosListResponse } from '../../interfaces/otros/credito.interfaces';
import { Video, VIdeoListResponse } from '../../interfaces/pelicula/videoPelis.interfaces';
import { Buy, Flatrate } from '../../interfaces/pelicula/proveedorPeli.interfaces';
import { Region } from '../../interfaces/pelicula/releaseDateCertifications.interfaces';
import { Keyword } from '../../interfaces/pelicula/pelicula-keywords.interfaces';
import { RatedPelicula, RatedPeliculasResponse } from '../../interfaces/pelicula/rated-peliculas.interfaces';
import { AccountService } from '../../services/autenticacion/account.service';
import { ListasService } from '../../services/listas.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-pelicula-details',
  templateUrl: './pelicula-details.component.html',
  styleUrls: ['./pelicula-details.component.css']
})
export class PeliculaDetailsComponent implements OnInit {

  estadoFav: boolean = false;
  estadoWatchlist: boolean = false;

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

  alertMessages: Array<{ type: string, message: string }> = [];  // Array para almacenar alertas

  @Output() estadoFavRecarga = new EventEmitter<boolean>();

  realizarEnvioAListPelicula() {
    this.estadoFavRecarga.emit(this.estadoFav);
  }

  listaPeliculasValoradas: RatedPelicula[] = [];

  rating: number = 0;

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


    this.getPeliculaRating(parseInt(this.peliculaId!));
    this.checkFavorito(parseInt(this.peliculaId!));
    this.checkWatchlist(parseInt(this.peliculaId!));

      this.checkFavorito(peliculaIdNum);
      this.checkWatchlist(peliculaIdNum);
    }

    this.cargarListasUsuario();
  }

  seleccionarVideo(video: Video) {
    this.selectedVideo = video;
  }

  cargarListasUsuario(): void {
    this.listasService.getListas().subscribe(
      (response) => {
        this.listas = response.results || [];
      },
      (error) => {
        console.error('Error al cargar listas:', error);
      }
    );
  }

  // ALERTS ------------------------------------------------------------------------------------------------------------------------------------------------------

  agregarPeliculaALista(listaId: string): void {
    if (!this.peliculaId) {
      this.mostrarAlerta('danger', 'No se encontró el ID de la película.');
      return;
    }

    this.listasService.agregarPeliculaALista(listaId, parseInt(this.peliculaId)).subscribe(
      (response) => {
        this.mostrarAlerta('success', '"'+this.pelicula!.title+'"'+ this.getTexto('addPeliToList'));
      },
      (error) => {
        console.error('Error al añadir película a la lista:', error);
        this.mostrarAlerta('danger', '"'+this.pelicula!.title+'"' + this.getTexto('addPeliToListAgain'));
      }
    );
  }

  mostrarAlerta(type: string, message: string): void {
    this.alertMessages.push({ type, message });

    // Opcional: si quieres que la alerta desaparezca después de cierto tiempo
    setTimeout(() => {
      this.alertMessages.shift(); // Elimina la alerta después de 3 segundos
    }, 4000);
  }

  close(alert: any): void {
    const index = this.alertMessages.indexOf(alert);
    if (index !== -1) {
      this.alertMessages.splice(index, 1);
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------------------------

  getCertification() {
    let certificacion = "N/A";  // Valor predeterminado si no se encuentra certificación

    // Busca la región de España (ES) o Gran Bretaña (GB)
    const region = this.regionList.find(region => region.iso_3166_1 === 'ES' || region.iso_3166_1 === 'GB');
    
    // Si encuentra la región y tiene datos en release_dates:
    if (region && region.release_dates && region.release_dates.length > 0) {
      const cert = region.release_dates[0].certification;
      if(cert === "A") {
        certificacion = cert;
      } else {
        certificacion = cert === "" ? "N/A" : "+" + cert;
      }
    }
    return certificacion;
  }

  /*async addToRatedMovies(peliculaId: number): Promise<any> {
    const urlAddPelicula = this.peliculaService.getUrlPostPeliculaRated(peliculaId);
    const data = {
      value: this.rating,  // Valor de la valoración
    };
  
    try {
      const response = await fetch(urlAddPelicula, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al valorar: ${response.status} - ${errorMessage}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en la operación de valoración:', error);
      throw error;
    }
  }*/

  getPeliculaRating(peliculaId: number): void {
    this.peliculaService.getPeliculaRating(peliculaId).subscribe(response => {
      if (response.rated) {
        this.rating = response.rated.value;
      }
    });
  }

  setRating(rating: number) {
    this.peliculaService.setPeliculaRating(parseInt(this.peliculaId!), rating).subscribe();

  }

  deleteRating() {
    this.peliculaService.deletePeliculaRating(parseInt(this.peliculaId!)).subscribe();
    this.rating = 0;
  }

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }

  getTexto(key: string): string {
    return this.configService.getTexto(key);
  }

  /*getIfPeliculaIsInLista(): boolean {
    let isInLista = false;
    this.listas.forEach(lista => {
      lista.items.forEach(item => {
        if(item.id === this.peliculaId) {
          isInLista = true;
        } else {
          isInLista;
        }
      });
    });
    return isInLista;
  }*/











  // BOTÓN FAVORITOS ------------------------------------------------------------------------------------------------------------------------

  checkFavorito(peliculaId: number): void {
    this.accountService.getFavoritosPeli().subscribe(response => {
      const favoritos = response.results;
      this.estadoFav = favoritos.some(pelicula => pelicula.id === peliculaId);
    });
  }

  async addOrRemoveFavoritos(peliculaId: number): Promise<any> {
    const urlAddFavoritos = this.accountService.getUrlAddFavoritos();
    this.estadoFavRecarga.emit(this.estadoFav);
    const data = {
      media_type: "movie",  // Cambiar a "tv" si es una serie
      media_id: peliculaId,
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

  onFavoritosBotonClick(peliculaId: number): void {
    this.toggleFavoritos(peliculaId);
  }

  toggleFavoritos(peliculaId: number): void {
    this.estadoFav = !this.estadoFav;
    this.addOrRemoveFavoritos(peliculaId).then(result => {
      console.log('Estado de favoritos actualizado:', result);
    }).catch(error => {
      console.error('Error al actualizar favoritos:', error);
    });
  }

  // BOTON WATCHlIST ------------------------------------------------------------------------------------------------------------------------

  checkWatchlist(peliculaId: number): void {
    this.accountService.getWatchlistPeli().subscribe(response => {
      const watchlist = response.results;
      this.estadoWatchlist = watchlist.some(pelicula => pelicula.id === peliculaId);
    });
  }

  async addOrRemoveWatchlist(peliculaId: number): Promise<any> {
    const urlAddWatchlist = this.accountService.getUrlAddWatchlist();
    const data = {
      media_type: "movie",  // Cambiar a "tv" si es una serie
      media_id: peliculaId,
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

  onWatchlistBotonClick(peliculaId: number): void {
    this.toggleWatchlist(peliculaId);
  }

  toggleWatchlist(peliculaId: number): void {
    this.estadoWatchlist = !this.estadoWatchlist;
    this.addOrRemoveWatchlist(peliculaId).then(result => {
      console.log('Estado de watchlist actualizado:', result);
    }).catch(error => {
      console.error('Error al actualizar watchlist:', error);
    });
  }

  
}