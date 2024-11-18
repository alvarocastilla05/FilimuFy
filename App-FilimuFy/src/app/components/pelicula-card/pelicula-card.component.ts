import { Component, Input, OnInit } from '@angular/core';
import { PeliculaDetailResponse } from '../../interfaces/pelicula-detail.interfaces';
import { PeliculaService } from '../../services/pelicula.service';
import { Region, ReleaseDate } from '../../interfaces/releaseDateCertifications.interfaces';

@Component({
  selector: 'app-pelicula-card',
  templateUrl: './pelicula-card.component.html',
  styleUrl: './pelicula-card.component.css'
})
export class PeliculaCardComponent implements OnInit{

  @Input() peliculaId: number | undefined;
  peliculaDetalle: PeliculaDetailResponse | undefined;
  regionList: Region[] = [];
  certificationEsp: Region | undefined;

  constructor(private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    this.peliculaService.getPeliculaById(this.peliculaId!).subscribe(resp => {
      this.peliculaDetalle = resp;
    });

    this.peliculaService.getCertificationById(this.peliculaId!).subscribe(resp => {
      this.regionList = resp.results;
    });
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