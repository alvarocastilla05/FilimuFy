import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Es } from '../interfaces/serie/proveedorSerie.interfaces';
import { ProveedoresTVListResponse, DatosProviderSeries } from '../interfaces/proveedores-series.interface';
import { DatosProviderPelis, ProveedoresFilmsListResponse } from '../interfaces/proveedores-pelis.interface';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

const API_KEY = "330dac319c12144e2cfd7dfb4bfcb9fd"

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient,
              private configService: ConfigService
  ) { }

  

// Dentro de tu servicio ProveedorService
getProveedoresSeries(): Observable<DatosProviderSeries[]> {
  return this.http.get<ProveedoresTVListResponse>(`https://api.themoviedb.org/3/watch/providers/tv?api_key=${API_KEY}`)
    .pipe(
      map(response => {
        if (this.configService.getLanguage() === 'es-ES') {
          return response.results.filter(result => result.display_priorities.ES !== undefined);
        } else {
          return response.results.filter(result => result.display_priorities.GB !== undefined);
        }
        
      })
    );
}


  getProveedoresPeliculas(): Observable<DatosProviderPelis[]>{
    return this.http.get<ProveedoresFilmsListResponse>(`https://api.themoviedb.org/3/watch/providers/movie?api_key=${API_KEY}`)
    .pipe(
      map(response => {
        if (this.configService.getLanguage() === 'es-ES') {
          return response.results.filter(result => result.display_priorities.ES !== undefined);
        } else {
          return response.results.filter(result => result.display_priorities.GB !== undefined);
        }
        
      })
    );
}
}