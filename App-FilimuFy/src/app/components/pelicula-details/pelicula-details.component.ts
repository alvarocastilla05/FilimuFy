import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDetailResponse } from '../../interfaces/pelicula-detail.interfaces';
import { Cast, CreditosListResponse } from '../../interfaces/credito.interfaces';
import { Video, VIdeoListResponse } from '../../interfaces/videoPelis.interfaces';
import { Flatrate, ProveedorPeliResponse } from '../../interfaces/proveedorPeli.interfaces';
import { Region } from '../../interfaces/releaseDateCertifications.interfaces';

@Component({
  selector: 'app-pelicula-details',
  templateUrl: './pelicula-details.component.html',
  styleUrl: './pelicula-details.component.css'
})
export class PeliculaDetailsComponent implements OnInit{

  peliculaId: string | null = '';
  pelicula: PeliculaDetailResponse | undefined;
  credito: CreditosListResponse | undefined;
  listaCreditos: Cast[] = [];
  video: VIdeoListResponse | undefined;
  videos: Video[] = [];
  selectedVideo: Video | undefined;
  proveedor: ProveedorPeliResponse | undefined;
  plataformas: Flatrate[] = [];
  regionList: Region[] = [];
  certificationEsp: Region | undefined;

  constructor(
    private peliculaService: PeliculaService, 
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

    this.peliculaService.getVideoById(this.peliculaId!).subscribe(respuesta => {
      this.video = respuesta;  
      this.videos = respuesta.results;  

      const trailer = this.videos.find(video => video.type === 'Trailer');
    if (trailer) {
      this.seleccionarVideo(trailer);
    }
  });

  this.peliculaService.getProveedor(parseInt(this.peliculaId!)).subscribe(respuesta => {
    this.proveedor = respuesta;
    this.plataformas = respuesta.flatrate;
  });

  this.peliculaService.getCertificationById(parseInt(this.peliculaId!)).subscribe(resp => {
    this.regionList = resp.results;
  });
  
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

}
