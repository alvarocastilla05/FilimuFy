import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../../interfaces/autenticacion/account-details.interface';
import { Pelicula, PeliculaListResponse } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { TVShow, TVShowListResponse } from '../../interfaces/serie/tv.interface';
import { environment } from '../../../environments/environment';


const SESSION_ID = localStorage.getItem('session_id');
const ACCOUNT_ID = parseInt(localStorage.getItem('account_id') ?? '0', 10);


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<AccountDetailsResponse> {
    return this.http.get<AccountDetailsResponse>(

      `${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${environment.sessionId}`

    );
  }

  getPeliculasFavoritas(page: number = 1): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`${environment.apiBaseUrl}/account/${ACCOUNT_ID}/favorite/movies?api_key=${environment.apiKey}&session_id=${environment.sessionId}&page=${page}&language=es-ES`);
  }

  getUrlEstadoFavorito(peliculaId: number): string {
    return `${environment.apiBaseUrl}/account/${ACCOUNT_ID}/favorite/movies?api_key=${environment.apiKey}&session_id=${environment.sessionId}&movie_id=${peliculaId}`;
  }

  getSeriesFavoritas(page: number = 1): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`${environment.apiBaseUrl}/account/${ACCOUNT_ID}/favorite/tv?api_key=${environment.apiKey}&session_id=${environment.sessionId}&page=${page}&language=es-ES`);
  }
  
  getUrlEstadoFavoritoTV(serieId: number): string {
    return `${environment.apiBaseUrl}/account/${ACCOUNT_ID}/favorite/tv?api_key=${environment.apiKey}&session_id=${environment.sessionId}&movie_id=${serieId}`;
  }

  getUrlAddFavoritos(): string {
    let urlAddFavoritos = `${environment.apiBaseUrl}/account/${ACCOUNT_ID}/favorite?api_key=${environment.apiKey}&session_id=${environment.sessionId}`;
    return urlAddFavoritos;
  }

  getFavoritosPeli(): Observable<{ results: Pelicula[] }> {
    return this.http.get<{ results: Pelicula[] }>(`${environment.apiBaseUrl}/account/{account_id}/favorite/movies?api_key=${environment.apiKey}&session_id=${environment.sessionId}`);
  }

  getFavoritosSerie(): Observable<{ results: TVShow[] }> {
    return this.http.get<{ results: TVShow[] }>(`${environment.apiBaseUrl}/account/{account_id}/favorite/tv?api_key=${environment.apiKey}&session_id=${environment.sessionId}`);
  }

  getWatchlistPeli(): Observable<{ results: Pelicula[] }> {
    return this.http.get<{ results: Pelicula[] }>(`${environment.apiBaseUrl}/account/{account_id}/watchlist/movies?api_key=${environment.apiKey}&session_id=${environment.sessionId}`);
  }

  getWatchlistSerie(): Observable<{ results: TVShow[] }> {
    return this.http.get<{ results: TVShow[] }>(`${environment.apiBaseUrl}/account/{account_id}/watchlist/tv?api_key=${environment.apiKey}&session_id=${environment.sessionId}`);
  } 

  getUrlAddWatchlist(): string {
    return `${environment.apiBaseUrl}/account/{account_id}/watchlist?api_key=${environment.apiKey}&session_id=${environment.sessionId}`;
  }

  getWatchlistSerieUrl(serieId: number): string {
    return `${environment.apiBaseUrl}/account/{account_id}/watchlist/tv?api_key=${environment.apiKey}&session_id=${environment.sessionId}&tv_id=${serieId}`;
  } 
}
