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
      searchPlaceholder: 'Buscar películas, series o actores...',
      favorites: 'Favoritos',
      ratings: 'Mis valoraciones',
      watchlist: 'Watchlist',
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
      nofavmv: 'No se han encontrado resultados relacionados con películas',
      nofavsh: 'No se han encontrado resultados relacionados con series',
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
      noworks: 'No se han adjuntado películas o series por las que este actor haya sido reconocido',
      results: 'Resultados para ',
      nortmv: 'No se ha valorado ninguna película',
      norttv: 'No se ha valorado ninguna serie',
      lists: 'Mis listas',
      newlist: 'Crear Nueva Lista',
      listname: 'Nombre de la lista',
      listdesc: 'Descripción de la lista',
      create: 'Crear lista',
      elemento: 'elemento',
      elementos: 'elementos',
      nolist: 'No se ha creado ninguna lista',
      myratings: 'Mis valoraciones',
      rtfilm: '¡Valora esta película!',
      opinion: '¿Qué te ha parecido ',
      rtshow: '¡Valora esta serie!',
      noactores: 'No se han encontrado actores relacionados',


      addPeliToList: ' añadida a la lista con éxito.',
      addPeliToListAgain: ' ya está añadida a esa lista.',

      searchEmpty: 'Por favor, ingrese un término de búsqueda.',

      listCreated: 'Lista creada con exito.',
      listUnnamed: 'Por favor, introduzca un nombre para la lista.',
      listDeleted: 'Lista eliminada con éxito.'

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
      noworks: 'No movies or TV Shows have been attached for which this actor has been recognized',
      results: 'Results for ',
      nortmv: 'No movies have been rated',
      norttv: 'No TV Shows have been rated',
      lists: 'My lists',
      newlist: 'Create New List',
      listname: 'List name',
      listdesc: 'List description',
      create: 'Create list',
      elemento: 'element',
      elementos: 'elements',
      nolist: 'No list has been created',
      myratings: 'My ratings',
      rtfilm: 'Rate this movie!',
      opinion: 'What did you think of ',
      rtshow: 'Rate this TV Show!',
      noactores: 'No results found related to any actor',


      addPeliToList: ' added to the list successfully.',
      addPeliToListAgain: ' is already added to that list.',

      searchEmpty: 'Enter a search term, please.',

      listCreated: 'List created successfully.',
      listUnnamed: 'Enter a name for the list, please.',
      listDeleted: 'List deleted successfully.'
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
