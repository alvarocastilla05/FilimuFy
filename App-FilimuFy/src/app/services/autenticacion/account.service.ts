import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../../interfaces/autenticacion/account-details.interface';
import { PeliculaListResponse } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { TVShowListResponse } from '../../interfaces/serie/tv.interface';
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

      `${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${SESSION_ID}`

    );
  }

  getPeliculasFavoritas(page: number = 1): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`${environment.apiBaseUrl}/account/${ACCOUNT_ID}/favorite/movies?api_key=${environment.apiKey}&session_id=${SESSION_ID}&page=${page}&language=es-ES`);
  }

  getUrlEstadoFavorito(peliculaId: number): string {
    return `${environment.apiBaseUrl}/account/${ACCOUNT_ID}/favorite/movies?api_key=${environment.apiKey}&session_id=${SESSION_ID}&movie_id=${peliculaId}`;
  }

  getSeriesFavoritas(page: number = 1): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`${environment.apiBaseUrl}/account/${ACCOUNT_ID}/favorite/tv?api_key=${environment.apiKey}&session_id=${SESSION_ID}&page=${page}&language=es-ES`);
  }
  
  getUrlEstadoFavoritoTV(serieId: number): string {
    return `${environment.apiBaseUrl}/account/${ACCOUNT_ID}/favorite/tv?api_key=${environment.apiKey}&session_id=${SESSION_ID}&movie_id=${serieId}`;
  }

  getUrlAddFavoritos(): string {
    let urlAddFavoritos = `${environment.apiBaseUrl}/account/${ACCOUNT_ID}/favorite?api_key=${environment.apiKey}&session_id=${SESSION_ID}`;
    return urlAddFavoritos;
  }
}
