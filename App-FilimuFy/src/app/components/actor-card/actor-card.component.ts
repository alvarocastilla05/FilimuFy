import { Component, Input } from '@angular/core';
import { ActorDetailResponse } from '../../interfaces/actor/actor-detail.interface';
import { ActorService } from '../../services/actor.service';
import { Actor, KnownFor } from '../../interfaces/actor/actores-list.interface';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrl: './actor-card.component.css'
})
export class ActorCardComponent {

  @Input() actorId: Actor | undefined;
  actorDetalle: Actor | undefined;
  knownForDisplay: string[] = [];
  placeholderFoto = 'https://png.pngtree.com/png-vector/20220618/ourmid/pngtree-default-photo-placeholder-account-anonymous-png-image_5130471.png';

  constructor(private actorService: ActorService) { }

}
