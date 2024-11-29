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
import { environment } from '../../environments/environment';
import { ProveedoreesSerieAdsListResponse } from '../interfaces/serie/proveedorSerieAds.interfaces';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class TVShowService {
  
  constructor(private http: HttpClient,
              private configService: ConfigService
  ) { }

  getSeries(page: number = 1): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`${environment.apiBaseUrl}/discover/tv?api_key=${environment.apiKey}&page=${page}&language=${this.configService.getLanguage()}`);
  }

  getSerieById(id: number): Observable<SerieDetailResponse>{
    return this.http.get<SerieDetailResponse>(`${environment.apiBaseUrl}/tv/${id}?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getGeneroById(id: number): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`${environment.apiBaseUrl}/genre/tv/list?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getVideoSerieById(id: string): Observable<VideoSerieListResponse>{
    return this.http.get<VideoSerieListResponse>(`${environment.apiBaseUrl}/tv/${id}/videos?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getCreditosSerieById(id: number): Observable<CreditosListResponse>{
    return this.http.get<CreditosListResponse>(`${environment.apiBaseUrl}/tv/${id}/credits?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getCertificationById(id: number): Observable<RatingsListResponse>{
    return this.http.get<RatingsListResponse>(`${environment.apiBaseUrl}/tv/${id}/content_ratings?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getProveedoresById(id: number): Observable<ProveedoreesSerieListResponse>{
    return this.http.get<ProveedoreesSerieListResponse>(`${environment.apiBaseUrl}/tv/${id}/watch/providers?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }

  getProveedoresAdsById(id: number): Observable<ProveedoreesSerieAdsListResponse>{
    return this.http.get<ProveedoreesSerieAdsListResponse>(`${environment.apiBaseUrl}/tv/${id}/watch/providers?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }  

  getKeywordsById(id: number): Observable<KeywordsSeriesListResponse>{
    return this.http.get<KeywordsSeriesListResponse>(`${environment.apiBaseUrl}/tv/${id}/keywords?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}`);
  }
  
  searchSeries(query: string) {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/search/tv?query=${query}&api_key=${environment.apiKey}`
    );
  }
  
  getSeriesPorGenero(currentPage: number, genreId: number[] | undefined): Observable<TVShowListResponse>{
    return this.http.get<TVShowListResponse>(`${environment.apiBaseUrl}/discover/tv?api_key=${environment.apiKey}&page=${currentPage}&with_genres=${genreId}`);
  }

  getSeriesPorPalabraClave(keywordId: number, currentPage: number): Observable<TVShowListResponse> {
    return this.http.get<TVShowListResponse>(
      `${environment.apiBaseUrl}/discover/tv?api_key=${environment.apiKey}&page=${currentPage}&with_keywords=${keywordId}&language=${this.configService.getLanguage()}`
    );
  }

  getSerieFiltradas(
    page: number,
    genreIds: number[],
    minVal: number,
    maxVal: number,
    minDur: number,
    maxDur: number,
    providerIds?: number[]
  ): Observable<TVShowListResponse> {
    let url = `${environment.apiBaseUrl}/discover/tv?api_key=${environment.apiKey}&page=${page}`;
  
    if (genreIds.length > 0) {
      url += `&with_genres=${genreIds.join(',')}`;
    }
    url += `&vote_average.gte=${minVal}&vote_average.lte=${maxVal}`;
    url += `&with_runtime.gte=${minDur}&with_runtime.lte=${maxDur}`;
    if (providerIds && providerIds.length > 0) {
      url += `&with_watch_providers=${providerIds.join(',')}`;
    }
    url += `&watch_region=${this.configService.getWatchRegion()}`;
  
    return this.http.get<TVShowListResponse>(url);
  }
  

  
  
}
