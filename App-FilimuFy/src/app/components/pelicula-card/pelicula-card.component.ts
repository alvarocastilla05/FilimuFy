import { Component, Input, OnInit } from '@angular/core';
import { PeliculaDetailResponse } from '../../interfaces/pelicula-detail.interfaces';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-pelicula-card',
  templateUrl: './pelicula-card.component.html',
  styleUrl: './pelicula-card.component.css'
})
export class PeliculaCardComponent implements OnInit{

  @Input() peliculaId: number | undefined;
  peliculaDetalle: PeliculaDetailResponse | undefined;

  constructor(private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    this.peliculaService.getPeliculaById(this.peliculaId!).subscribe(resp => {
      this.peliculaDetalle = resp;
    });
  }
}