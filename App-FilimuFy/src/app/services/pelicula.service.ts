import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeliculaListResponse } from '../interfaces/pelicula/pelicula-list.interfaces';
import { PeliculaDetailResponse } from '../interfaces/pelicula/pelicula-detail.interfaces';
import { GenreListResponse } from '../interfaces/otros/genero.interfaces';
import { CreditosListResponse } from '../interfaces/otros/credito.interfaces';
import { VIdeoListResponse } from '../interfaces/pelicula/videoPelis.interfaces';
import { ProveedoreesPeliListResponse } from '../interfaces/pelicula/proveedorPeli.interfaces';
import { FechaSalidaResponse } from '../interfaces/pelicula/releaseDateCertifications.interfaces';
import { KeywordsListResponse } from '../interfaces/pelicula/pelicula-keywords.interfaces';
import { environment } from '../../environments/environment';
import { RatedPelicula, RatedPeliculasResponse } from '../interfaces/pelicula/rated-peliculas.interfaces';
import { AccountService } from './autenticacion/account.service';


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(private http: HttpClient) { }

  getPeliculas(page: number = 1): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}&language=es-ES`);
  }

  getPeliculaById(id: number): Observable<PeliculaDetailResponse>{
    return this.http.get<PeliculaDetailResponse>(`${environment.apiBaseUrl}/movie/${id}?api_key=${environment.apiKey}&language=es-ES`);
  }

  getGeneroById(id: number): Observable<GenreListResponse>{
    return this.http.get<GenreListResponse>(`${environment.apiBaseUrl}/genre/movie/list?api_key=${environment.apiKey}&language=es-ES`);
  }

  getCreditosById(id: number): Observable<CreditosListResponse>{
    return this.http.get<CreditosListResponse>(`${environment.apiBaseUrl}/movie/${id}/credits?api_key=${environment.apiKey}&language=es-ES`);
  }

  getVideoById(id: string): Observable<VIdeoListResponse>{
    return this.http.get<VIdeoListResponse>(`${environment.apiBaseUrl}/movie/${id}/videos?api_key=${environment.apiKey}&language=es-ES`);
  }

  getCertificationById(id: number): Observable<FechaSalidaResponse>{
    return this.http.get<FechaSalidaResponse>(`${environment.apiBaseUrl}/movie/${id}/release_dates?api_key=${environment.apiKey}&language=es-ES`);
  }

  getProveedoresById(id: number): Observable<ProveedoreesPeliListResponse>{
    return this.http.get<ProveedoreesPeliListResponse>(`${environment.apiBaseUrl}/movie/${id}/watch/providers?api_key=${environment.apiKey}&language=es-ES`);
  }
  
  getKeywordsById(id: number): Observable<KeywordsListResponse>{
    return this.http.get<KeywordsListResponse>(`${environment.apiBaseUrl}/movie/${id}/keywords?api_key=${environment.apiKey}&language=es-ES`);
  }

  searchPeliculas(query: string) {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/search/movie?query=${query}&api_key=${environment.apiKey}`
    );
  }
  
  getPeliculasPorGenero(currentPage: number, genreId: number[] | undefined): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`${environment.apiBaseUrl}/discover/movie?api_key=${environment.apiKey}&page=${currentPage}&with_genres=${genreId}`);

  }

  getPeliculasPorPalabraClave(keywordId: number, currentPage: number): Observable<PeliculaListResponse> {
    return this.http.get<PeliculaListResponse>(
      `${environment.apiBaseUrl}/discover/movie?api_key=${environment.apiKey}&page=${currentPage}&with_keywords=${keywordId}&language=es-ES`
    );
  }

  getPeliculaRating(peliculaId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/movie/${peliculaId}/account_states?api_key=${environment.apiKey}&session_id=${environment.sessionId}`;
    return this.http.get(url);
  }

  getUrlPostPeliculaRated(peliculaId: number): string {
    let url = `${environment.apiBaseUrl}/movie/${peliculaId}/rating?api_key=${environment.apiKey}&session_id=${environment.sessionId}`;
    return url;
  }

  setPeliculaRating(peliculaId: number, rating: number): Observable<RatedPelicula> {
    const url = `${environment.apiBaseUrl}/movie/${peliculaId}/rating?api_key=${environment.apiKey}&session_id=${environment.sessionId}`;
    return this.http.post<RatedPelicula>(url, { value: rating });
  }

  deletePeliculaRating(peliculaId: number): Observable<any>{
    return this.http.delete<any>(
      `${environment.apiBaseUrl}movie/${peliculaId}/rating?api_key=${environment.apiKey}&session_id=${environment.sessionId}`
    );
  }
}