import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../../interfaces/autenticacion/account-details.interface';
import { PeliculaListResponse } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { TVShowListResponse } from '../../interfaces/serie/tv.interface';

const API_KEY = "330dac319c12144e2cfd7dfb4bfcb9fd";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<AccountDetailsResponse> {
    let sessionId = localStorage.getItem('session_id');
    return this.http.get<AccountDetailsResponse>(
      `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`
    );
  }

  getPeliculasFavoritas(page: number = 1, account_id: number | undefined): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${API_KEY}&page=${page}&language=es-ES`);
  }

  getSeriesFavoritas(page: number = 1, account_id: number | undefined): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`https://api.themoviedb.org/3/account/${account_id}/favorite/tv?api_key=${API_KEY}&page=${page}&language=es-ES`);
  }
  
}
