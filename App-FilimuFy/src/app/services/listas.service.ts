import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(private http: HttpClient) { }

  getListas(): Observable<any> {
    const url = `${environment.apiBaseUrl}/account/${environment.accountId}/lists?api_key=${environment.apiKey}&language=es-ES&session_id=${environment.sessionId}`;
    return this.http.get(url);
  }
  

  crearLista(nombre: string, descripcion: string) {
    const url = `${environment.apiBaseUrl}/list?api_key=${environment.apiKey}&session_id=${environment.sessionId}`;
    const body = {
      name: nombre,
      description: descripcion,
      iso_639_1: 'es',
    };
    return this.http.post(url, body); 
  }

  eliminarLista(id: string) {
    const url = `${environment.apiBaseUrl}/list/${id}?api_key=${environment.apiKey}&session_id=${environment.sessionId}`;
    return this.http.delete(url);
  }

  agregarPeliculaALista(listaId: string, movieId: number) {
    const url = `${environment.apiBaseUrl}/list/${listaId}/add_item`;
    const body = {
      media_id: movieId,
    };

    return this.http.post<any>(url, body, {
      params: {
        api_key: environment.apiKey,
        session_id: localStorage.getItem('session_id') || '',
      },
    });
  }

  getDetallesLista(listaId: string) {
    const url = `${environment.apiBaseUrl}/list/${listaId}`
    return this.http.get<any>(url, {
      params: {
        api_key: environment.apiKey,
        language: 'es-ES'
      },
    });
  }

  eliminarElementoDeLista(listaId: string, elementoId: string) {
    const url = `${environment.apiBaseUrl}/list/${listaId}/remove_item`;
    return this.http.post(
      url,
      { media_id: elementoId }, // Cambiado de 'id' a 'media_id'
      {
        params: {
          api_key: environment.apiKey,
          session_id: localStorage.getItem('session_id') || '0',
        },
      }
    );
  }
  
}
