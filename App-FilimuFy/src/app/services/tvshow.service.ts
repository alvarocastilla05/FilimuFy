import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TVShowListResponse } from '../interfaces/tv.interface';
import { SerieDetailResponse } from '../interfaces/serie-detail.interface';
import { VideoSerieListResponse } from '../interfaces/videoSeries.interfaces';
import { CreditosListResponse } from '../interfaces/credito.interfaces';

const API_KEY = "330dac319c12144e2cfd7dfb4bfcb9fd"

@Injectable({
  providedIn: 'root'
})
export class TVShowService {

  constructor(private http: HttpClient) { }

  getSeries(): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`);
  }

  getSerieById(id: number): Observable<SerieDetailResponse>{
    return this.http.get<SerieDetailResponse>(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
  }

  getGeneroById(id: number): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`);
  }

  getVideoSerieById(id: string): Observable<VideoSerieListResponse>{
    return this.http.get<VideoSerieListResponse>(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`);
  }

  getCreditosSerieById(id: number): Observable<CreditosListResponse>{
    return this.http.get<CreditosListResponse>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`);
  }

}
