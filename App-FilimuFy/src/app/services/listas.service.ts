import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(private http: HttpClient,
              private configService: ConfigService
  ) { }

  // 1. GETTERS PRIVADOS (Para leer siempre el dato actualizado)
  private get sessionId(): string | null {
    return localStorage.getItem('session_id');
  }

  private get accountId(): string | null {
    return localStorage.getItem('account_id');
  }

  // -------------------------------------------------------------------------

  getListas(): Observable<any> {
    // CORREGIDO: Usamos this.accountId y this.sessionId
    // Antes fallaba porque environment.accountId estaba vacío al inicio
    const url = `${environment.apiBaseUrl}/account/${this.accountId}/lists?api_key=${environment.apiKey}&language=${this.configService.getLanguage()}&session_id=${this.sessionId}`;
    return this.http.get(url);
  }
  
  crearLista(nombre: string, descripcion: string) {
    // CORREGIDO: Usamos this.sessionId
    const url = `${environment.apiBaseUrl}/list?api_key=${environment.apiKey}&session_id=${this.sessionId}`;
    const body = {
      name: nombre,
      description: descripcion,
      iso_639_1: this.configService.getWatchRegion(),
    };
    return this.http.post(url, body);
  }

  eliminarLista(id: string) {
    // CORREGIDO: Usamos this.sessionId
    const url = `${environment.apiBaseUrl}/list/${id}?api_key=${environment.apiKey}&session_id=${this.sessionId}`;
    return this.http.delete(url);
  }

  // Estas de abajo ya las tenías bien (usabas localStorage), 
  // pero las actualizo para que usen los getters y quede todo el código limpio y coherente.

  agregarPeliculaALista(listaId: string, movieId: number) {
    const url = `${environment.apiBaseUrl}/list/${listaId}/add_item`;
    const body = {
      media_id: movieId,
    };

    return this.http.post<any>(url, body, {
      params: {
        api_key: environment.apiKey,
        session_id: this.sessionId || '', // Usamos el getter
      },
    });
  }

  agregarSerieALista(listaId: string, tvId: number) {
    const url = `${environment.apiBaseUrl}/list/${listaId}/add_item`;
    const body = {
      media_id: tvId,
      media_type: 'tv'
    };

    return this.http.post<any>(url, body, {
      params: {
        api_key: environment.apiKey,
        session_id: this.sessionId || '', // Usamos el getter
      },
    });
  }

  getDetallesLista(listaId: string) {
    const url = `${environment.apiBaseUrl}/list/${listaId}`
    return this.http.get<any>(url, {
      params: {
        api_key: environment.apiKey,
        language: this.configService.getLanguage(),
      },
    });
  }

  eliminarElementoDeLista(listaId: string, elementoId: string) {
    const url = `${environment.apiBaseUrl}/list/${listaId}/remove_item`;
    return this.http.post(
      url,
      { media_id: elementoId },
      {
        params: {
          api_key: environment.apiKey,
          session_id: this.sessionId || '0', // Usamos el getter
        },
      }
    );
  }
}