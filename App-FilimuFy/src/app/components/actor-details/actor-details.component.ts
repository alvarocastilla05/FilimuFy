import { Component, Input, OnInit } from '@angular/core';
import { ActorDetailResponse } from '../../interfaces/actor-detail.interface';
import { ActorService } from '../../services/actor.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDetailResponse } from '../../interfaces/pelicula-detail.interfaces';
import { Pelicula, PeliculaListResponse } from '../../interfaces/pelicula-list.interfaces';


@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.css'
})
export class ActorDetailsComponent implements OnInit{


  actorId: string | null = '';
  actor: ActorDetailResponse | undefined;
  knownForDisplay: string[] = [];

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.actorId = this.route.snapshot.paramMap.get('id');


    this.actorService.getActorById(parseInt(this.actorId!)).subscribe(respuesta => {
      this.actor = respuesta;
    });

    
  }

}
