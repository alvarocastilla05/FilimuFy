import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Pelicula, PeliculaListResponse } from '../interfaces/pelicula-list.interfaces';
import { PeliculaDetailResponse } from '../interfaces/pelicula-detail.interfaces';
import { GenreListResponse } from '../interfaces/genero.interfaces';
import { CreditosListResponse } from '../interfaces/credito.interfaces';
import { VIdeoListResponse } from '../interfaces/videoPelis.interfaces';

const API_KEY = "330dac319c12144e2cfd7dfb4bfcb9fd"

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(private http: HttpClient) { }

  getPeliculas(): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
  }

  getPeliculaById(id: number): Observable<PeliculaDetailResponse>{
    return this.http.get<PeliculaDetailResponse>(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
  }

  getGeneroById(id: number): Observable<GenreListResponse>{
    return this.http.get<GenreListResponse>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
  }

  getCreditosById(id: number): Observable<CreditosListResponse>{
    return this.http.get<CreditosListResponse>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
  }

  getVideoById(id: string): Observable<VIdeoListResponse>{
    return this.http.get<VIdeoListResponse>(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
  }
}
