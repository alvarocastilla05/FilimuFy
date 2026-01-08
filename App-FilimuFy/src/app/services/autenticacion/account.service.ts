import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../../interfaces/autenticacion/account-details.interface';
import { Pelicula, PeliculaListResponse } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { TVShow, TVShowListResponse } from '../../interfaces/serie/tv.interface';
import { environment } from '../../../environments/environment';
import { RatedPeliculasResponse } from '../../interfaces/pelicula/rated-peliculas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor(private http: HttpClient) {}

  // 1. GETTERS PRIVADOS:
  // Estos leen el valor fresco del localStorage cada vez que se llaman.
  // Si usas environment, se queda con el valor antiguo (vacío).
  private get sessionId(): string | null {
    return localStorage.getItem('session_id');
  }

  private get accountId(): string | null {
    return localStorage.getItem('account_id');
  }

  // -----------------------------------------------------------------------

  getAccountDetails(): Observable<AccountDetailsResponse> {
    // AQUI ESTABA EL FALLO: Cambiamos environment.sessionId por this.sessionId
    return this.http.get<AccountDetailsResponse>(
      `${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${this.sessionId}`
    );
  }

  getRatedPeliculas(page: number = 1): Observable<RatedPeliculasResponse>{
    return this.http.get<RatedPeliculasResponse>(
      `${environment.apiBaseUrl}/account/${this.accountId}/rated/movies?api_key=${environment.apiKey}&page=${page}&session_id=${this.sessionId}&language=es-ES`
    );
  }

  getRatedSeries(page: number = 1): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(
      `${environment.apiBaseUrl}/account/${this.accountId}/rated/tv?api_key=${environment.apiKey}&session_id=${this.sessionId}&page=${page}&language=es-ES`
    );
  }
  
  getPeliculasFavoritas(page: number = 1): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(
        `${environment.apiBaseUrl}/account/${this.accountId}/favorite/movies?api_key=${environment.apiKey}&session_id=${this.sessionId}&page=${page}&language=es-ES`
    );
  }

  getUrlEstadoFavorito(peliculaId: number): string {
    return `${environment.apiBaseUrl}/account/${this.accountId}/favorite/movies?api_key=${environment.apiKey}&session_id=${this.sessionId}&movie_id=${peliculaId}`;
  }

  getSeriesFavoritas(page: number = 1): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(
        `${environment.apiBaseUrl}/account/${this.accountId}/favorite/tv?api_key=${environment.apiKey}&session_id=${this.sessionId}&page=${page}&language=es-ES`
    );
  }
  
  getUrlEstadoFavoritoTV(serieId: number): string {
    return `${environment.apiBaseUrl}/account/${this.accountId}/favorite/tv?api_key=${environment.apiKey}&session_id=${this.sessionId}&movie_id=${serieId}`;
  }

  getUrlAddFavoritos(): string {
    return `${environment.apiBaseUrl}/account/${this.accountId}/favorite?api_key=${environment.apiKey}&session_id=${this.sessionId}`;
  }

  // OJO: Aquí tenías puesto "{account_id}" literal en el string. Lo he corregido a ${this.accountId}
  getFavoritosPeli(): Observable<{ results: Pelicula[] }> {
    return this.http.get<{ results: Pelicula[] }>(
        `${environment.apiBaseUrl}/account/${this.accountId}/favorite/movies?api_key=${environment.apiKey}&session_id=${this.sessionId}`
    );
  }

  getFavoritosSerie(): Observable<{ results: TVShow[] }> {
    return this.http.get<{ results: TVShow[] }>(
        `${environment.apiBaseUrl}/account/${this.accountId}/favorite/tv?api_key=${environment.apiKey}&session_id=${this.sessionId}`
    );
  }

  getWatchlistPeli(page: number = 1): Observable<{ results: Pelicula[] }> {
    return this.http.get<{ results: Pelicula[] }>(
        `${environment.apiBaseUrl}/account/${this.accountId}/watchlist/movies?api_key=${environment.apiKey}&session_id=${this.sessionId}&page=${page}&language=es-ES`
    );
  }

  getWatchlistSerie(page: number = 1): Observable<{ results: TVShow[] }> {
    return this.http.get<{ results: TVShow[] }>(
        `${environment.apiBaseUrl}/account/${this.accountId}/watchlist/tv?api_key=${environment.apiKey}&session_id=${this.sessionId}&page=${page}&language=es-ES`
    );
  } 

  getUrlAddWatchlist(): string {
    return `${environment.apiBaseUrl}/account/${this.accountId}/watchlist?api_key=${environment.apiKey}&session_id=${this.sessionId}`;
  }

  getWatchlistSerieUrl(serieId: number): string {
    return `${environment.apiBaseUrl}/account/${this.accountId}/watchlist/tv?api_key=${environment.apiKey}&session_id=${this.sessionId}&tv_id=${serieId}`;
  } 
}