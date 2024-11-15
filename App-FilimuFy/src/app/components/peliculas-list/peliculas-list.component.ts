import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula-list.interfaces';
import { PeliculaService } from '../../services/pelicula.service';
import { Genre, PeliculaDetailResponse } from '../../interfaces/pelicula-detail.interfaces';

@Component({
  selector: 'app-peliculas-list',
  templateUrl: './peliculas-list.component.html',
  styleUrl: './peliculas-list.component.css'
})
export class PeliculasListComponent implements OnInit{

  listaPeliculas: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    this.peliculaService.getPeliculas()
      .subscribe(resp => {
        this.listaPeliculas = resp.results;
      });
  }

  
    
  
}
