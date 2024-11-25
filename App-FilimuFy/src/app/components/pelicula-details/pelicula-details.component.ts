import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaDetailResponse } from '../../interfaces/pelicula/pelicula-detail.interfaces';
import { Cast, CreditosListResponse } from '../../interfaces/otros/credito.interfaces';
import { Video, VIdeoListResponse } from '../../interfaces/pelicula/videoPelis.interfaces';
import { Buy, Flatrate } from '../../interfaces/pelicula/proveedorPeli.interfaces';
import { Region } from '../../interfaces/pelicula/releaseDateCertifications.interfaces';
import { Keyword } from '../../interfaces/pelicula/pelicula-keywords.interfaces';
import { Favoritos_WatchlistResponse } from '../../interfaces/otros/AddToFavOrWatch.interface';
import { AccountService } from '../../services/autenticacion/account.service';

@Component({
  selector: 'app-pelicula-details',
  templateUrl: './pelicula-details.component.html',
  styleUrl: './pelicula-details.component.css'
})
export class PeliculaDetailsComponent implements OnInit{

  estadoFav = false;

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
    
    this.cambioEstiloBotonFavorito();
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

  // Método para agregar una película a los favoritos.
  async addQuitFavoritos(peliculaId: number): Promise<Favoritos_WatchlistResponse> {
    const urlAddFavoritos = this.accountService.getUrlAddFavoritos();
    const data = {
      media_type: "movie",  // Cambiar a "tv" si es una serie
      media_id: peliculaId,
      favorite: this.estadoFav  // Variable true añade favorito.
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: Favoritos_WatchlistResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error al añadir favorito:', error);
      throw error;
    }
  }

  cambioEstiloBotonFavorito() {
    const boton = document.getElementById('favorito') as HTMLButtonElement;

    if (this.estadoFav) {
      // Restaurar el color original
      boton.style.backgroundColor = '#909090';
      boton.style.color = 'white';
      this.addQuitFavoritos(parseInt(this.peliculaId!));
    } else {
      // Cambiar el color del botón
      boton.style.backgroundColor = '#e4637d';
      boton.style.color = 'white';
      this.addQuitFavoritos(parseInt(this.peliculaId!));
    }

    // Alternar el estado de color
    this.estadoFav = !this.estadoFav;
  }


}