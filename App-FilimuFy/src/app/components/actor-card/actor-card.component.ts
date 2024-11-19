import { Component, Input } from '@angular/core';
import { ActorDetailResponse } from '../../interfaces/actor-detail.interface';
import { ActorService } from '../../services/actor.service';
import { Actor, KnownFor } from '../../interfaces/actores-list.interface';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrl: './actor-card.component.css'
})
export class ActorCardComponent {

  @Input() actorId: Actor | undefined;
  actorDetalle: Actor | undefined;
  knownForDisplay: string[] = [];
  placeholderFoto = '../../images/PlaceholderDeFoto.jpg'

  constructor(private actorService: ActorService) { }

}
