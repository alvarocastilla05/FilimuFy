import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDetailResponse } from '../../interfaces/pelicula/pelicula-detail.interfaces';
import { Cast, CreditosListResponse } from '../../interfaces/otros/credito.interfaces';
import { Video, VIdeoListResponse } from '../../interfaces/pelicula/videoPelis.interfaces';
import { Buy, Flatrate } from '../../interfaces/pelicula/proveedorPeli.interfaces';
import { Region } from '../../interfaces/pelicula/releaseDateCertifications.interfaces';
import { Keyword } from '../../interfaces/pelicula/pelicula-keywords.interfaces';
import { AccountService } from '../../services/autenticacion/account.service';

@Component({
  selector: 'app-pelicula-details',
  templateUrl: './pelicula-details.component.html',
  styleUrl: './pelicula-details.component.css'
})
export class PeliculaDetailsComponent implements OnInit{

  estadoFav: boolean = false;

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

  constructor(
    private peliculaService: PeliculaService, 
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.peliculaId = this.route.snapshot.paramMap.get('id');

    this.peliculaService.getPeliculaById(parseInt(this.peliculaId!)).subscribe(respuesta => {
      this.pelicula = respuesta;
    });

    this.peliculaService.getCreditosById(parseInt(this.peliculaId!)).subscribe(respuesta => {
      this.credito = respuesta;
      this.listaCreditos = respuesta.cast;
    });

    this.peliculaService.getKeywordsById(parseInt(this.peliculaId!)).subscribe(respuesta => {
      this.keywords = respuesta.keywords;
    });

    this.peliculaService.getVideoById(this.peliculaId!).subscribe(respuesta => {
      this.video = respuesta;  
      this.videos = respuesta.results;  

      const trailer = this.videos.find(video => video.type === 'Trailer');
      if (trailer) {
        this.seleccionarVideo(trailer);
      }
    });

    this.peliculaService.getProveedoresById(parseInt(this.peliculaId!)).subscribe(respuesta => {
      this.listaProveedores = respuesta.results.ES.flatrate;
      this.listaProveedoresPago = respuesta.results.ES.buy;
    });

    this.peliculaService.getCertificationById(parseInt(this.peliculaId!)).subscribe(resp => {
      this.regionList = resp.results;
    });
    
    this.inicializarEstadoFav();
  }

  seleccionarVideo(video: Video) {
    this.selectedVideo = video;
  }

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

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }











  // BOTÓN FAVORITOS ------------------------------------------------------------------------------------------------------------------------

  async obtenerEstadoFavorito(peliculaId: number): Promise<boolean> {
    const urlEstadoFavorito = this.accountService.getUrlEstadoFavorito(peliculaId);
    try {
      const response = await fetch(urlEstadoFavorito);
      if (!response.ok) {
        throw new Error(`Error al obtener estado de favorito: ${response.status}`);
      }
  
      const data = await response.json();
      return data.favorite;  // Si está en favoritos, devuelve true
    } catch (error) {
      console.error('Error al obtener estado de favoritos:', error);
      return false;  // Si ocurre un error, consideramos que no está en favoritos
    }
  }

  async inicializarEstadoFav(): Promise<void> {
    if (this.peliculaId) {
      // Primero, intenta obtener el estado desde localStorage
      const estadoFavGuardado = localStorage.getItem(`favorito-${this.peliculaId}`);
  
      if (estadoFavGuardado !== null) {
        this.estadoFav = JSON.parse(estadoFavGuardado);  // Si hay estado en localStorage, úsalo
      } else {
        // Si no existe en localStorage, obtiene el estado de la API de TMDB
        this.estadoFav = await this.obtenerEstadoFavorito(parseInt(this.peliculaId!));
        localStorage.setItem(`favorito-${this.peliculaId}`, JSON.stringify(this.estadoFav)); // Guarda en localStorage
      }
    }
  }

  async toggleFavoritos(peliculaId: number): Promise<void> {
    this.estadoFav = !this.estadoFav;  // Alterna el estado
  
    // Guarda en localStorage el nuevo estado
    localStorage.setItem(`favorito-${peliculaId}`, JSON.stringify(this.estadoFav));
  
    try {
      // Llama al método para añadir o quitar de favoritos
      const result = await this.addOrRemoveFavoritos(peliculaId);
      console.log('Estado de favoritos actualizado:', result);
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
    }
  }

  async addOrRemoveFavoritos(peliculaId: number): Promise<any> {
    const urlAddFavoritos = this.accountService.getUrlAddFavoritos();
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
  
  // Método del botón para manejar el clic
  onFavoritosBotonClick(peliculaId: number): void {
    this.toggleFavoritos(peliculaId);
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------
  
}