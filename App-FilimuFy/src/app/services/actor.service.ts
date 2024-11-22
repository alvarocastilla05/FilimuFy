import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor, ActorListResponse } from '../interfaces/actor/actores-list.interface';
import { ActorDetailResponse } from '../interfaces/actor/actor-detail.interface';
import { PeliculaListResponse } from '../interfaces/pelicula/pelicula-list.interfaces';

const API_KEY = "330dac319c12144e2cfd7dfb4bfcb9fd"

@Injectable({
  providedIn: 'root'
})
export class ActorService {


  constructor(private http: HttpClient) { }


  getActores(page: number = 1): Observable<ActorListResponse>{
    return this.http.get<ActorListResponse>(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${page}`);
  }


  getActorById(id: number): Observable<ActorDetailResponse> {
    return this.http.get<ActorDetailResponse>(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`);
  }

  getPeliculasActorById(id: number): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}`);
  }
}
