import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneroListResponse } from '../interfaces/generoPelis.interfaces';
import { environment } from '../../environments/environment';

 

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private http: HttpClient) { }

  getGenerosPelicula(): Observable<GeneroListResponse>{
    return this.http.get<GeneroListResponse>(`${environment.apiBaseUrl}/genre/movie/list?api_key=${environment.apiKey}&language=es-ES`);
  }

  getGenerosSerie(): Observable<GeneroListResponse>{
    return this.http.get<GeneroListResponse>(`${environment.apiBaseUrl}/genre/tv/list?api_key=${environment.apiKey}&language=es-ES`);
  }
}
