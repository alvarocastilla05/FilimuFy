import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeliculaListResponse } from '../interfaces/pelicula-list.interfaces';
import { PeliculaDetailResponse } from '../interfaces/pelicula-detail.interfaces';
import { GenreListResponse } from '../interfaces/genero.interfaces';
import { CreditosListResponse } from '../interfaces/credito.interfaces';
import { VIdeoListResponse } from '../interfaces/videoPelis.interfaces';
import { ProveedoreesPeliListResponse } from '../interfaces/proveedorPeli.interfaces';
import { FechaSalidaResponse } from '../interfaces/releaseDateCertifications.interfaces';
import { KeywordsListResponse } from '../interfaces/pelicula-keywords.interfaces';

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

  getCertificationById(id: number): Observable<FechaSalidaResponse>{
    return this.http.get<FechaSalidaResponse>(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`);
  }

  getProveedoresById(id: number): Observable<ProveedoreesPeliListResponse>{
    return this.http.get<ProveedoreesPeliListResponse>(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`);
  }
  
  getKeywordsById(id: number): Observable<KeywordsListResponse>{
    return this.http.get<KeywordsListResponse>(`https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${API_KEY}`);
  }
}
