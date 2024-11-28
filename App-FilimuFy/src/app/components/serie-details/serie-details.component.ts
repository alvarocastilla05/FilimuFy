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
import { RatedSerie } from '../../interfaces/serie/rated-series.interfaces';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrl: './serie-details.component.css'
})
export class SerieDetailsComponent implements OnInit{

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

  listaSeriesValoradas: RatedSerie[] = [];

  rating: number = 0;

  constructor(
    private serieService: TVShowService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serieId = this.activatedRoute.snapshot.paramMap.get('id');

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

    this.getSerieRating(parseInt(this.serieId!));

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

  getSerieRating(serieId: number): void {
    this.serieService.getSerieRating(serieId).subscribe(response => {
      if(response.rated){
        this.rating = response.rated.value;
      }
    })
  }

  setRating(rating: number) {
    this.serieService.setSerieRating(parseInt(this.serieId!), rating).subscribe();
  }

  deleteRating() {
    this.serieService.setSerieRating(parseInt(this.serieId!), 0).subscribe();
  }

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }

}
