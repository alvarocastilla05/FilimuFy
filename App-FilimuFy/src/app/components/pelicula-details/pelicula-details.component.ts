import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDetailResponse } from '../../interfaces/pelicula-detail.interfaces';
import { Cast, CreditosListResponse } from '../../interfaces/credito.interfaces';

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
  }

}
