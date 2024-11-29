import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor, ActorListResponse } from '../interfaces/actor/actores-list.interface';
import { ActorDetailResponse } from '../interfaces/actor/actor-detail.interface';
import { PeliculaListResponse } from '../interfaces/pelicula/pelicula-list.interfaces';
import { environment } from '../../environments/environment';
import { CombinedListResponse } from '../interfaces/combined-list.interface';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class ActorService {


  constructor(private http: HttpClient,
              private configService: ConfigService
  ) { }


  getActores(page: number = 1): Observable<ActorListResponse>{
    return this.http.get<ActorListResponse>(`${environment.apiBaseUrl}/person/popular?api_key=${environment.apiKey}&page=${page}&language=${this.configService.getLanguage()}`);
  }


  getActorById(id: number): Observable<ActorDetailResponse> {
    return this.http.get<ActorDetailResponse>(`${environment.apiBaseUrl}/person/${id}?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getPeliculasActorById(id: number): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`${environment.apiBaseUrl}/person/${id}/movie_credits?api_key=${environment.apiKey}`);
  }

  getCombinedCredits(id: number): Observable<CombinedListResponse> {
    return this.http.get<CombinedListResponse>(`${environment.apiBaseUrl}/person/${id}/combined_credits?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }
  
}
