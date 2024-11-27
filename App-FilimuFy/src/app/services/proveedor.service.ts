import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Es } from '../interfaces/serie/proveedorSerie.interfaces';
import { ProveedoresTVListResponse } from '../interfaces/proveedores-series.interface';

const API_KEY = "330dac319c12144e2cfd7dfb4bfcb9fd"

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  getProveedoresSeries(): Observable<ProveedoresTVListResponse>{
    return this.http.get<ProveedoresTVListResponse>(`https://api.themoviedb.org/3/watch/providers/tv?api_key=${API_KEY}`);
  }

  getProveedoresPeliculas(): Observable<ProveedoresTVListResponse>{
    return this.http.get<ProveedoresTVListResponse>(`https://api.themoviedb.org/3/watch/providers/tv?api_key=${API_KEY}`);
  }
}
