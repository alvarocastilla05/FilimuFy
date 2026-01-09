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

  // ==========================================
  // 1. GETTERS PRIVADOS (CRUCIAL)
  // ==========================================
  // Leen el localStorage en el momento exacto de la llamada.
  // Esto arregla el problema de que al inicio la sesión parezca vacía.
  private get sessionId(): string | null {
    return localStorage.getItem('session_id');
  }

  private get accountId(): string | null {
    return localStorage.getItem('account_id');
  }

  // ==========================================
  // 2. OBTENER DATOS DE LA CUENTA
  // ==========================================

  getAccountDetails(): Observable<AccountDetailsResponse> {
    return this.http.get<AccountDetailsResponse>(
      `${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${this.sessionId}`
    );
  }

  // ==========================================
  // 3. VERIFICAR ESTADO (LO NUEVO PARA DETALLES)
  // ==========================================
  // Estos métodos le dicen a la ficha de detalle si ya has valorado/guardado esa peli concreta.
  
  getMovieAccountStates(movieId: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/movie/${movieId}/account_states?api_key=${environment.apiKey}&session_id=${this.sessionId}`
    );
  }

  getTVAccountStates(tvId: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/tv/${tvId}/account_states?api_key=${environment.apiKey}&session_id=${this.sessionId}`
    );
  }

  // ==========================================
  // 4. ACCIONES (GUARDAR DATOS)
  // ==========================================

  // --- FAVORITOS ---
  markAsFavorite(mediaId: number, mediaType: 'movie' | 'tv', isFavorite: boolean): Observable<any> {
    const body = {
      media_type: mediaType,
      media_id: mediaId,
      favorite: isFavorite
    };
    return this.http.post<any>(
      `${environment.apiBaseUrl}/account/${this.accountId}/favorite?api_key=${environment.apiKey}&session_id=${this.sessionId}`,
      body
    );
  }

  // --- WATCHLIST ---
  addToWatchlist(mediaId: number, mediaType: 'movie' | 'tv', isWatchlist: boolean): Observable<any> {
    const body = {
      media_type: mediaType,
      media_id: mediaId,
      watchlist: isWatchlist
    };
    return this.http.post<any>(
      `${environment.apiBaseUrl}/account/${this.accountId}/watchlist?api_key=${environment.apiKey}&session_id=${this.sessionId}`,
      body
    );
  }

  // --- VALORACIONES (RATING) ---
  rateMovie(movieId: number, value: number): Observable<any> {
    const body = { value: value }; 
    return this.http.post<any>(
      `${environment.apiBaseUrl}/movie/${movieId}/rating?api_key=${environment.apiKey}&session_id=${this.sessionId}`,
      body
    );
  }

  rateTVShow(tvId: number, value: number): Observable<any> {
    const body = { value: value };
    return this.http.post<any>(
      `${environment.apiBaseUrl}/tv/${tvId}/rating?api_key=${environment.apiKey}&session_id=${this.sessionId}`,
      body
    );
  }

  deleteRating(mediaId: number, mediaType: 'movie' | 'tv'): Observable<any> {
    const endpoint = mediaType === 'movie' ? 'movie' : 'tv';
    return this.http.delete<any>(
      `${environment.apiBaseUrl}/${endpoint}/${mediaId}/rating?api_key=${environment.apiKey}&session_id=${this.sessionId}`
    );
  }

  // ==========================================
  // 5. OBTENER LISTADOS (Rated, Favorites, Watchlist)
  // ==========================================

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

  getSeriesFavoritas(page: number = 1): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(
        `${environment.apiBaseUrl}/account/${this.accountId}/favorite/tv?api_key=${environment.apiKey}&session_id=${this.sessionId}&page=${page}&language=es-ES`
    );
  }

  // Versiones simplificadas para arrays directos (usadas en checkFavorito antiguo)
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

  // ==========================================
  // 6. LISTAS PERSONALIZADAS (CUSTOM LISTS)
  // ==========================================

  getListasCreadas(page: number = 1): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/account/${this.accountId}/lists?api_key=${environment.apiKey}&session_id=${this.sessionId}&page=${page}&language=es-ES`
    );
  }

  createList(name: string, description: string): Observable<any> {
    const body = {
      name: name,
      description: description,
      language: "es"
    };
    return this.http.post<any>(
      `${environment.apiBaseUrl}/list?api_key=${environment.apiKey}&session_id=${this.sessionId}`,
      body
    );
  }

  getListDetails(listId: string | number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/list/${listId}?api_key=${environment.apiKey}&language=es-ES`
    );
  }

  addMovieToList(listId: number, movieId: number): Observable<any> {
    const body = {
      media_id: movieId
    };
    return this.http.post<any>(
      `${environment.apiBaseUrl}/list/${listId}/add_item?api_key=${environment.apiKey}&session_id=${this.sessionId}`,
      body
    );
  }

  deleteList(listId: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiBaseUrl}/list/${listId}?api_key=${environment.apiKey}&session_id=${this.sessionId}`
    );
  }

  // ==========================================
  // 7. HELPERS (Strings de URL)
  // ==========================================
  // Se mantienen por compatibilidad, pero es mejor usar los métodos Observable de arriba.

  getUrlAddFavoritos(): string {
    return `${environment.apiBaseUrl}/account/${this.accountId}/favorite?api_key=${environment.apiKey}&session_id=${this.sessionId}`;
  }

  getUrlAddWatchlist(): string {
    return `${environment.apiBaseUrl}/account/${this.accountId}/watchlist?api_key=${environment.apiKey}&session_id=${this.sessionId}`;
  }

  getUrlEstadoFavorito(peliculaId: number): string {
    return `${environment.apiBaseUrl}/account/${this.accountId}/favorite/movies?api_key=${environment.apiKey}&session_id=${this.sessionId}&movie_id=${peliculaId}`;
  }
  
  getUrlEstadoFavoritoTV(serieId: number): string {
    return `${environment.apiBaseUrl}/account/${this.accountId}/favorite/tv?api_key=${environment.apiKey}&session_id=${this.sessionId}&movie_id=${serieId}`;
  }
  
  getWatchlistSerieUrl(serieId: number): string {
    return `${environment.apiBaseUrl}/account/${this.accountId}/watchlist/tv?api_key=${environment.apiKey}&session_id=${this.sessionId}&tv_id=${serieId}`;
  } 
}