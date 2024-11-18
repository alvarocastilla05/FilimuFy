import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor, ActorListResponse } from '../interfaces/actores-list.interface';
import { ActorDetailResponse } from '../interfaces/actor-detail.interface';

const API_KEY = "330dac319c12144e2cfd7dfb4bfcb9fd"

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http: HttpClient) { }

  getActores(): Observable<ActorListResponse>{
    return this.http.get<ActorListResponse>(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`);
  }

  getActorById(id: number): Observable<Actor>{
    return this.http.get<Actor>(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`);
  }
}
