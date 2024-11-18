import { Component, OnInit } from '@angular/core';
import { SerieDetailResponse } from '../../interfaces/serie-detail.interface';
import { TVShowService } from '../../services/tvshow.service';
import { ActivatedRoute } from '@angular/router';
import { Region } from '../../interfaces/releaseDateCertifications.interfaces';
import { VideoSerie, VideoSerieListResponse } from '../../interfaces/videoSeries.interfaces';
import { Cast, CreditosListResponse } from '../../interfaces/credito.interfaces';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrl: './serie-details.component.css'
})
export class SerieDetailsComponent implements OnInit{

  serieId: string | null = '';
  serie: SerieDetailResponse | undefined;
  regionList: Region[] = [];
  video: VideoSerieListResponse | undefined;
  videos: VideoSerie[] = [];
  selectedVideo: VideoSerie | undefined;
  certificationEsp: Region | undefined;
  credito: CreditosListResponse | undefined;
  listaCreditos: Cast[] = [];

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
  }

  seleccionarVideo(video: VideoSerie) {
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

}
