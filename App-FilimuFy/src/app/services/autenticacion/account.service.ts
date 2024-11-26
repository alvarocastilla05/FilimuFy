import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../../interfaces/autenticacion/account-details.interface';
import { PeliculaListResponse } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { TVShowListResponse } from '../../interfaces/serie/tv.interface';

const API_KEY = "330dac319c12144e2cfd7dfb4bfcb9fd";
const SESSION_ID = localStorage.getItem('session_id');
const ACCOUNT_ID = parseInt(localStorage.getItem('account_id') ?? '0', 10);

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<AccountDetailsResponse> {
    return this.http.get<AccountDetailsResponse>(
      `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${SESSION_ID}`
    );
  }

  getPeliculasFavoritas(page: number = 1): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&page=${page}&language=es-ES`);
  }

  getUrlEstadoFavorito(peliculaId: number): string {
    return `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&movie_id=${peliculaId}`;
  }

  getUrlAddFavoritos(): string {
    let urlAddFavoritos = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`;
    return urlAddFavoritos;
  }

  getSeriesFavoritas(page: number = 1): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite/tv?api_key=${API_KEY}&session_id=${SESSION_ID}&page=${page}&language=es-ES`);
  }
  
}
