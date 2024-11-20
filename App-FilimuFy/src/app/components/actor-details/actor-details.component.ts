import { Component, Input, OnInit } from '@angular/core';
import { ActorDetailResponse } from '../../interfaces/actor-detail.interface';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDetailResponse } from '../../interfaces/pelicula-detail.interfaces';
import { Pelicula, PeliculaListResponse } from '../../interfaces/pelicula-list.interfaces';
import { Actor } from '../../interfaces/actores-list.interface';


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
  actorPelis: Actor | undefined;

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.actorId = this.route.snapshot.paramMap.get('id');

    if(this.actorId){

    this.actorService.getActorById(parseInt(this.actorId!)).subscribe(respuesta => {
      this.actor = respuesta;
    });

    this.actorService.getPeliculasActorById(parseInt(this.actorId!)).subscribe(respuesta => {
      this.listaPeliculas = respuesta.results;
      console.log(this.listaPeliculas);
    });

    /*this.actorService.getActores().subscribe(respuesta => {
      this.actorPelis = respuesta.results.find(actor => actor.id === parseInt(this.actorId!));
    });*/

    this.buscarActorEnPaginas(parseInt(this.actorId!));

  }

  }

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

  trackById(index: number, item: any): number {
    return item.id;
  }

}
