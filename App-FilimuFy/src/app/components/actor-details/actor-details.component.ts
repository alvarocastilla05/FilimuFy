import { Component, OnInit } from '@angular/core';
import { ActorDetailResponse } from '../../interfaces/actor/actor-detail.interface';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDetailResponse } from '../../interfaces/pelicula/pelicula-detail.interfaces';
import { Pelicula, PeliculaListResponse } from '../../interfaces/pelicula/pelicula-list.interfaces';
import { Actor } from '../../interfaces/actor/actores-list.interface';
import { Cast } from '../../interfaces/combined-list.interface';
import { ConfigService } from '../../services/config.service';


@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.css'
})
export class ActorDetailsComponent implements OnInit{

  actorId: string | null = '';
  actor: ActorDetailResponse | undefined;
  listaPeliculas: Pelicula[] = [];
  pelicula: PeliculaListResponse | undefined;
  actorPelis: Cast[] = [];
  placeholderFoto = 'https://png.pngtree.com/png-vector/20220618/ourmid/pngtree-default-photo-placeholder-account-anonymous-png-image_5130471.png';

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute,
    private configService: ConfigService
  ) { }


  ngOnInit(): void {
    this.actorId = this.route.snapshot.paramMap.get('id');
  
    if (this.actorId) {
      this.actorService.getActorById(parseInt(this.actorId)).subscribe(respuesta => {
        this.actor = respuesta;
      });
  
      this.actorService.getCombinedCredits(parseInt(this.actorId)).subscribe(respuesta => {
        this.actorPelis = respuesta.cast;
        console.log('Trabajos del actor:', this.actorPelis);
      });
    }
  }
  
/*
  buscarActorEnPaginas(actorId: number): void {
    let pagina = 1;

    const buscar = () => {
      this.actorService.getActores(pagina).subscribe(respuesta => {
        const actor = respuesta.results.find(a => a.id === actorId);
        if (actor) {
          this.actorPelis = actor;
        } else if (pagina < respuesta.total_pages) {
          pagina++;
          buscar();
        }
      });
    };

    buscar();
  }
*/
  trackById(index: number, item: any): number {
    return item.id;
  }

  getTexto(key: string): string {
    return this.configService.getTexto(key);
  }

}
