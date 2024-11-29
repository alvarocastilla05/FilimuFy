import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeliculaListResponse } from '../interfaces/pelicula/pelicula-list.interfaces';
import { PeliculaDetailResponse } from '../interfaces/pelicula/pelicula-detail.interfaces';
import { GenreListResponse } from '../interfaces/otros/genero.interfaces';
import { CreditosListResponse } from '../interfaces/otros/credito.interfaces';
import { VIdeoListResponse } from '../interfaces/pelicula/videoPelis.interfaces';
import { ProveedoreesPeliListResponse } from '../interfaces/pelicula/proveedorPeli.interfaces';
import { FechaSalidaResponse } from '../interfaces/pelicula/releaseDateCertifications.interfaces';
import { KeywordsListResponse } from '../interfaces/pelicula/pelicula-keywords.interfaces';
import { environment } from '../../environments/environment';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
 
  

  constructor(private http: HttpClient,
              private configService: ConfigService
  ) { }

  getPeliculas(page: number = 1): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`${environment.apiBaseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}&language=${this.configService.getLanguage()}`);
  }

  getPeliculaById(id: number): Observable<PeliculaDetailResponse>{
    return this.http.get<PeliculaDetailResponse>(`${environment.apiBaseUrl}/movie/${id}?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getGeneroById(id: number): Observable<GenreListResponse>{
    return this.http.get<GenreListResponse>(`${environment.apiBaseUrl}/genre/movie/list?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getCreditosById(id: number): Observable<CreditosListResponse>{
    return this.http.get<CreditosListResponse>(`${environment.apiBaseUrl}/movie/${id}/credits?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getVideoById(id: string): Observable<VIdeoListResponse>{
    return this.http.get<VIdeoListResponse>(`${environment.apiBaseUrl}/movie/${id}/videos?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getCertificationById(id: number): Observable<FechaSalidaResponse>{
    return this.http.get<FechaSalidaResponse>(`${environment.apiBaseUrl}/movie/${id}/release_dates?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getProveedoresById(id: number): Observable<ProveedoreesPeliListResponse>{
    return this.http.get<ProveedoreesPeliListResponse>(`${environment.apiBaseUrl}/movie/${id}/watch/providers?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }
  
  getKeywordsById(id: number): Observable<KeywordsListResponse>{
    return this.http.get<KeywordsListResponse>(`${environment.apiBaseUrl}/movie/${id}/keywords?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  searchPeliculas(query: string) {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/search/movie?query=${query}&api_key=${environment.apiKey}`
    );
  }
  
  getPeliculasPorGenero(currentPage: number, genreId: number[] | undefined): Observable<PeliculaListResponse>{
    return this.http.get<PeliculaListResponse>(`${environment.apiBaseUrl}/discover/movie?api_key=${environment.apiKey}&page=${currentPage}&with_genres=${genreId}`);

  }

  getPeliculasPorPalabraClave(keywordId: number, currentPage: number): Observable<PeliculaListResponse> {
    return this.http.get<PeliculaListResponse>(
      `${environment.apiBaseUrl}/discover/movie?api_key=${environment.apiKey}&page=${currentPage}&with_keywords=${keywordId}&language=${this.configService.getLanguage()}`
    );
  }

  getPelisFiltradas(
    page: number,
    genreIds: number[],
    minVal: number,
    maxVal: number,
    minDur: number,
    maxDur: number,
    providerIds?: number[]
  ): Observable<PeliculaListResponse> {
    let url = `${environment.apiBaseUrl}/discover/movie?api_key=${environment.apiKey}&page=${page}`;
  
    if (genreIds.length > 0) {
      url += `&with_genres=${genreIds.join(',')}`;
    }
    url += `&vote_average.gte=${minVal}&vote_average.lte=${maxVal}`;
    url += `&with_runtime.gte=${minDur}&with_runtime.lte=${maxDur}`;
    if (providerIds && providerIds.length > 0) {
      url += `&with_watch_providers=${providerIds.join(',')}`;
    }
    url += `&watch_region=${this.configService.getWatchRegion()}`;
  
    return this.http.get<PeliculaListResponse>(url);
  }

  

}
