import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TVShowListResponse } from '../interfaces/serie/tv.interface';
import { SerieDetailResponse } from '../interfaces/serie/serie-detail.interface';
import { VideoSerieListResponse } from '../interfaces/serie/videoSeries.interfaces';
import { CreditosListResponse } from '../interfaces/otros/credito.interfaces';
import { RatingsListResponse } from '../interfaces/serie/contentRatingsCertifications.interfaces';
import { ProveedoreesSerieListResponse } from '../interfaces/serie/proveedorSerie.interfaces';
import { KeywordsSeriesListResponse } from '../interfaces/serie/serie-keywords.interfaces';

const API_KEY = "330dac319c12144e2cfd7dfb4bfcb9fd"

@Injectable({
  providedIn: 'root'
})
export class TVShowService {

  constructor(private http: HttpClient) { }

  getSeries(page: number = 1): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${page}&language=es-ES`);
  }

  getSerieById(id: number): Observable<SerieDetailResponse>{
    return this.http.get<SerieDetailResponse>(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es-ES`);
  }

  getGeneroById(id: number): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=es-ES`);
  }

  getVideoSerieById(id: string): Observable<VideoSerieListResponse>{
    return this.http.get<VideoSerieListResponse>(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=es-ES`);
  }

  getCreditosSerieById(id: number): Observable<CreditosListResponse>{
    return this.http.get<CreditosListResponse>(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=es-ES`);
  }

  getCertificationById(id: number): Observable<RatingsListResponse>{
    return this.http.get<RatingsListResponse>(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${API_KEY}&language=es-ES`);
  }

  getProveedoresById(id: number): Observable<ProveedoreesSerieListResponse>{
    return this.http.get<ProveedoreesSerieListResponse>(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${API_KEY}&language=es-ES`);
  }

  getKeywordsById(id: number): Observable<KeywordsSeriesListResponse>{
    return this.http.get<KeywordsSeriesListResponse>(`https://api.themoviedb.org/3/tv/${id}/keywords?api_key=${API_KEY}&language=es-ES`);
  }
  
  searchSeries(query: string) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}`
    );
  }
  
  getSeriesPorGenero(currentPage: number, genreId: number[] | undefined): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${currentPage}&with_genres=${genreId}`);
  }

  getSeriesPorPalabraClave(keywordId: number, currentPage: number): Observable<TVShowListResponse> {
    return this.http.get<TVShowListResponse>(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${currentPage}&with_keywords=${keywordId}&language=es-ES`
    );
  }

  getSeriesPorProveedores(page: number, providerIds: number[]): Observable<TVShowListResponse> {
    const providerString = providerIds.join(',');
    return this.http.get<TVShowListResponse>(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${page}&with_watch_providers=${providerString}&watch_region=ES&language=es-ES`
    );
  }

  
  
}
