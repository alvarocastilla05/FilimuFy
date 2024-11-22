import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneroListResponse } from '../interfaces/generoPelis.interfaces';

const API_KEY = "330dac319c12144e2cfd7dfb4bfcb9fd"
 

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private http: HttpClient) { }

  getGeneros(): Observable<GeneroListResponse>{
    return this.http.get<GeneroListResponse>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
  }
}
