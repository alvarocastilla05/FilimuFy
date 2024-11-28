import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../../interfaces/autenticacion/account-details.interface';
import { environment } from '../../../environments/environment';
import { RatedPeliculasResponse } from '../../interfaces/pelicula/rated-peliculas.interfaces';
import { RatedSeriesResponse } from '../../interfaces/serie/rated-series.interfaces';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<AccountDetailsResponse> {
    let sessionId = localStorage.getItem('session_id');
    return this.http.get<AccountDetailsResponse>(
      `${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${sessionId}`
    );
  }

  getRatedPeliculas(page: number = 1): Observable<RatedPeliculasResponse>{
    return this.http.get<RatedPeliculasResponse>(
      `${environment.apiBaseUrl}account/${environment.accountId}/rated/movies?api_key=${environment.apiKey}&session_id=${environment.accountId}&page=${page}&language=es-ES`
    );
  }

  getRatedSeries(page: number = 1): Observable<RatedSeriesResponse>{
    return this.http.get<RatedSeriesResponse>(
      `${environment.apiBaseUrl}account/${environment.accountId}/rated/tv?api_key=${environment.apiKey}&session_id=${environment.accountId}&page=${page}&language=es-ES`
    );
  }
  
}
