import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private language: string = 'es-ES'; // Idioma predeterminado
  private watchRegion: string = 'ES'; // Región predeterminada

  constructor() {
    // Cargar configuraciones guardadas (si existen)
    this.language = localStorage.getItem('language') || 'es-ES';
    this.watchRegion = localStorage.getItem('watch_region') || 'ES';
  }

  // Métodos para gestionar el idioma
  getLanguage(): string {
    return this.language;
  }

  setLanguage(newLanguage: string): void {
    this.language = newLanguage;
    localStorage.setItem('language', newLanguage); // Persistir
  }

  // Métodos para gestionar la región
  getWatchRegion(): string {
    return this.watchRegion;
  }

  setWatchRegion(newRegion: string): void {
    this.watchRegion = newRegion;
    localStorage.setItem('watch_region', newRegion); // Persistir
  }
}
