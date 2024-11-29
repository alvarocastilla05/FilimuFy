import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private language: string = 'es-ES'; // Idioma predeterminado
  private watchRegion: string = 'ES'; // Región predeterminada

  private textos: { [key: string]: { [key: string]: string } } = {
    'es-ES,ES': {
      popularMovies: 'Películas populares',
      popularSeries: 'Series populares',
      popularActors: 'Actores populares',
      searchPlaceholder: 'Buscar películas o series...',
      favorites: 'Favoritos',
      ratings: 'Mis valoraciones',
      watchlist: 'Mi watchlist',
      listas: 'Mis listas',
      logout: 'Cerrar sesión',
      login: 'Iniciar sesión',
      filter: 'Filtros',
      genre: 'Géneros',
      rating: 'Rango de valoración',
      duration: 'Duración',
      providers: 'Dónde ver',
      filtrar: 'Filtrar',
      movies: 'Películas',
      shows: 'Series',
      actores: 'Actores',
      nofavmv: 'No se han encontrado resultados relacionados con películas.',
      nofavsh: 'No se han encontrado resultados relacionados con series.',
      more: 'Mostar más',
      originalTitle: 'Título original',
      originalLanguage: 'Idioma original',
      presupuesto: 'Presupuesto',
      ingresos: 'Ingresos',
      keywords: 'Palabras clave',
      reparto: 'Reparto Principal',
      trailer: 'Reproducir tráiler',
      tipo: 'Tipo',
      creador: 'Creador(es)',
      temporadas: 'Temporadas',
      temporada: 'Temporada',
      nosinopsis: 'Sinopsis no disponible.',
      nocast: 'No se han añadido personas al reparto principal.',
      nokeywords: 'No se han añadido palabras clave.',
      noseasons: 'No se han añadido temporadas a esta serie.',
      nobiografia: 'Biografía no disponible.',
      fechanacimiento: 'Fecha de nacimiento',
      fechadefuncion: 'Fecha de defunción',
      lugar: 'Lugar de nacimiento',
      conocido: 'Conocido por',
      popularidad: 'Popularidad',
      tambien: 'También conocido como',
      noworks: 'No se han adjuntado películas o series por las que este actor haya sido reconocido'



    },
    'en-GB,GB': {
      popularMovies: 'Popular Movies',
      popularSeries: 'Popular Series',
      popularActors: 'Popular Actors',
      searchPlaceholder: 'Search movies or TV Shows...',
      favorites: 'Favorites',
      ratings: 'My ratings',
      watchlist: 'My watchlist',
      listas: 'My lists',
      logout: 'Log out',
      login: 'Log in',
      filter: 'Filters',
      genre: 'Genres',
      rating: 'Rating range',
      duration: 'Duration',
      providers: 'Where to watch',
      filtrar: 'Filter',
      movies: 'Movies',
      shows: 'TV Shows',
      actores: 'Actors',
      nofavmv: 'No results found related to movies.',
      nofavsh: 'No results found related to TV Shows.',
      more: 'Show more',
      originalTitle: 'Original title',
      originalLanguage: 'Original language',
      presupuesto: 'Budget',
      ingresos: 'Revenue',
      keywords: 'Keywords',
      reparto: 'Main Cast',
      trailer: 'Play trailer',
      tipo: 'Type',
      creador: 'Creator(s)',
      temporadas: 'Seasons',
      temporada: 'Season',
      nosinopsis: 'Synopsis not available.',
      nocast: 'No people have been added to the main cast.',
      nokeywords: 'No keywords have been added.',
      noseasons: 'No seasons have been added to this series.',
      nobiografia: 'Biography not available.',
      fechanacimiento: 'Date of birth',
      fechadefuncion: 'Date of death',
      lugar: 'Place of birth',
      conocido: 'Known for',
      popularidad: 'Popularity',
      tambien: 'Also known as',
      noworks: 'No movies or TV Shows have been attached for which this actor has been recognized'

    },
  };

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

  // Método para obtener el texto traducido
  getTexto(key: string): string {
    const currentLanguageAndRegion = `${this.language},${this.watchRegion}`;
    return this.textos[currentLanguageAndRegion]?.[key] || key; // Retorna la clave si no encuentra el texto
  }
}
