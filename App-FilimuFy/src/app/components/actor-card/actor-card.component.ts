import { Component, Input } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../interfaces/actor/actores-list.interface';
import { Cast } from '../../interfaces/otros/credito.interfaces';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrl: './actor-card.component.css'
})
export class ActorCardComponent {

  @Input() actorId: Actor | undefined;
  @Input() actorCreditos: Cast | undefined;
  actorDetalle: Actor | undefined;
  knownForDisplay: string[] = [];
  placeholderFoto = 'https://png.pngtree.com/png-vector/20220618/ourmid/pngtree-default-photo-placeholder-account-anonymous-png-image_5130471.png';

}
